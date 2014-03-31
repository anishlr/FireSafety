#pragma strict

public var extinguisher : Transform;
public var particle : GameObject;
private var interactText : String = "Press F To Pick Up The Extinguisher";
public var InteractTextStyle : GUIStyle;

public var extinguisherBoxOpen : Texture;

private var init : boolean = false;
private var interactTextRect : Rect;
private var hasEntered : boolean = false;
private var extinguisherInstance: Transform;

private var particleInstance: GameObject;

private var playerPos : Vector3;
private var playerRot : Quaternion;
private var playerObject : GameObject;

static var pickedUpExtinguisher : boolean = false;

function Start () {
	var textSize : Vector2 = InteractTextStyle.CalcSize(new GUIContent(interactText));
	interactTextRect = new Rect(Screen.width / 2 - textSize.x / 2, Screen.height - (textSize.y + 5), textSize.x, textSize.y);
	
	init = true;
}

function Update () {
	if(!init) {
		return;
	}
	
	HandleUserInput();
	
	if(pickedUpExtinguisher) {
	interactText= "Press Left Mouse Button to Dispense the Extinguisher";
	var ExtinguisherBox : GameObject = GameObject.Find("ExtinguisherBox");
	ExtinguisherBox.renderer.material.SetTexture("_MainTex", extinguisherBoxOpen);
	
		UpdateExtinguisherPosition();
	}
}

function OnTriggerEnter(col : Collider) {
	if(col.gameObject.tag == "Player") {
		hasEntered = true;
	}
}

function OnTriggerExit(col: Collider){
	hasEntered = false;
}

function OnGUI() {
	if(!init || !hasEntered) {
		return;
	}

	GUI.Label(interactTextRect, interactText, InteractTextStyle);
}
	
function HandleUserInput() {
		playerObject = GameObject.FindWithTag("Player");
		playerPos = playerObject.transform.position;
		playerRot = playerObject.transform.rotation;
		
	if(!pickedUpExtinguisher && hasEntered && Input.GetButtonDown("Interact")){
		// Picked up the fire extinguisher
		pickedUpExtinguisher = true;
		extinguisherInstance = Instantiate(extinguisher, playerPos, playerRot);
	}
	else if (pickedUpExtinguisher && Input.GetButtonDown("Fire1"))  {
	particleInstance = Instantiate(particle, playerPos, playerRot);
	}
	else if(pickedUpExtinguisher && Input.GetButtonUp("Fire1"))	
	{
	Destroy(particleInstance, 85*Time.deltaTime);
	
	}		
}

function UpdateExtinguisherPosition() {
	extinguisherInstance.position = playerObject.transform.position;
	extinguisherInstance.rotation = playerObject.transform.rotation;
	extinguisherInstance.Translate(0.4, -0.2, 0.9);
	extinguisherInstance.Rotate(-90, 90, 0);
	
	particleInstance.transform.position = playerObject.transform.position;
	particleInstance.transform.rotation = playerObject.transform.rotation;
	particleInstance.transform.Translate(0.4, -0.2, 0.9);
}