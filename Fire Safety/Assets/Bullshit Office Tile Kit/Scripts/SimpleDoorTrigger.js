﻿public var Door : Transform;
public var OpenAngleAmount : float = 88.0f;
public var SmoothRotation : float;
	
private var init : boolean = false;
private var hasEntered : boolean = false;
private var doorOpen : boolean = false;
private var checkedDoor : boolean = false;
private var startAngle : Vector3;
private var openAngle : Vector3;
	
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
	}
}

function OnTriggerExit(col : Collider){
	hasEntered = false;
	StateManager.UpdateContextualState(ContextualState.None);
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
	else if (Input.GetButtonDown("AltInteract")) {
		checkedDoor = true;
	}
	
	if(checkedDoor) {
		if(doorOpen) {
			StateManager.UpdateContextualState(ContextualState.CheckedDoorKnobAndDoorOpen);
		}
		else {
			StateManager.UpdateContextualState(ContextualState.CheckedDoorKnobAndDoorClosed);
		}
	}
	else if (doorOpen) {
		StateManager.UpdateContextualState(ContextualState.CanCloseDoor);
	}
	else {
		StateManager.UpdateContextualState(ContextualState.CanOpenDoor);
	}
}