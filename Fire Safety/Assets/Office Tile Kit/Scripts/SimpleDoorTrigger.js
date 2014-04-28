public var Door : Transform;
public var SmoothRotation : float;
public var OpenAngleAmount : float = 88.0f;
public var minimumHotDistance : float = 9.5f;

private var openAngle : Vector3;
private var startAngle : Vector3;
private var init : boolean = false;
private var isHot : boolean = false;
private var doorOpen : boolean = false;
private var hasEntered : boolean = false;
private var checkedDoor : boolean = false;
private var stateManager : StateManager;

function Start() {
	// Check if Door Game Object is properly assigned
	if(Door == null){
		Debug.LogError (this + " :: Door Object Not Defined!");
	}
	
	// Init Start and Open door angles
	startAngle = Door.eulerAngles;
	openAngle = new Vector3(startAngle.x, startAngle.y + OpenAngleAmount, startAngle.z);
	
	init = true;
}
	
function Update() {
	if(!init)
		return;
	
	HandleDoorRotation();
	
	if(hasEntered) {
		HandleUserInput();	
	}
}

function OnTriggerEnter(col : Collider){
	// Only react to the player entering the trigger zone
	if(col.gameObject.tag == "Player"){
		hasEntered = true;
		checkedDoor = false;

		if(stateManager == null) {
			stateManager = GameObject.Find("State Manager").GetComponent(StateManager);
		}
	}
}

function OnTriggerExit(col : Collider){
	hasEntered = false;
	stateManager.UpdateContextualState(ContextualState.None, false);
}

function HandleDoorRotation(){
	if(!doorOpen) {
		Door.rotation = Quaternion.Euler(Vector3.Slerp(Door.eulerAngles, startAngle, Time.deltaTime * SmoothRotation));
	}
	else {
		Door.rotation = Quaternion.Euler(Vector3.Slerp(Door.eulerAngles, openAngle, Time.deltaTime * SmoothRotation));
	}
}

function HandleUserInput(){
	if (Input.GetButtonDown("Interact")) {
		doorOpen = !doorOpen;
	}
	else if (stateManager.CurrentGameState() != GameState.EnterOffice &&
			 stateManager.CurrentGameState() != GameState.EnterOffice &&
			 Input.GetButtonDown("AltInteract")) {
		checkedDoor = true;

		var fireInstances = GameObject.FindGameObjectsWithTag("Fire");
		for (var fireInstance in fireInstances) {
			var distance = Vector3.Distance(fireInstance.transform.position, Door.position); 
			if (distance < minimumHotDistance){
				isHot = true;
				break;
			}
			else {
				isHot = false;
			}
		}		
	}

	if(checkedDoor) {
		if(!doorOpen) {
			if(isHot) {
				stateManager.UpdateContextualState(ContextualState.CheckedDoorKnobAndDoorIsHot, false);
			}
			else {
				stateManager.UpdateContextualState(ContextualState.CheckedDoorKnobAndDoorIsCold, false);
			}
		}
		
	}
	else if (doorOpen) {
		stateManager.UpdateContextualState(ContextualState.CanCloseDoor, false);
	}
	else {
		stateManager.UpdateContextualState(ContextualState.CanOpenDoor, false);
	}
	
}