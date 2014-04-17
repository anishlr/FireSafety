#pragma strict

public var particle : GameObject;
public var extinguisher : Transform;
public var extinguisherBoxOpen : Texture;

private var playerObject : GameObject;
private var hasEntered : boolean = false;
private var extinguisherInstance: Transform;

static var particleSystemInstance: GameObject;
static var pickedUpExtinguisher : boolean = false;

function Update () {
	HandleUserInput();
	
	if(pickedUpExtinguisher) {
		// Change the extinguisher box's texture to reflect the missing extinguisher (since the player has picked it up)
		var ExtinguisherBox : GameObject = GameObject.Find("ExtinguisherBox");
		ExtinguisherBox.renderer.material.SetTexture("_MainTex", extinguisherBoxOpen);
		UpdateExtinguisherPosition();
	}
}

function OnTriggerEnter(col : Collider) {
	if(col.gameObject.tag == "Player") {
		hasEntered = true;
		StateManager.UpdateContextualState(ContextualState.CanPickUpExtinguisher);
	}
}

function OnTriggerExit(col: Collider){
	hasEntered = false;
	StateManager.UpdateContextualState(ContextualState.None);
}
	
function HandleUserInput() {
	playerObject = GameObject.FindWithTag("MainCamera");
		
	if(!pickedUpExtinguisher && hasEntered && Input.GetButtonDown("Interact")){
		// Picked up the fire extinguisher
		pickedUpExtinguisher = true;
		extinguisherInstance = Instantiate(extinguisher, playerObject.transform.position, playerObject.transform.rotation);
	}
	else if(pickedUpExtinguisher && particleSystemInstance == null && Input.GetButtonDown("Fire1")) {
		particleSystemInstance = Instantiate(particle, playerObject.transform.position, playerObject.transform.rotation);
		particleSystemInstance.gameObject.tag = "ExtinguisherContents";
	}
	else if(pickedUpExtinguisher && particleSystemInstance != null && Input.GetButtonUp("Fire1"))	{
		particleSystemInstance.particleSystem.Stop();
		Destroy(particleSystemInstance, 5.0);
		particleSystemInstance = null;
	}		
}

function UpdateExtinguisherPosition() {
	extinguisherInstance.position = playerObject.transform.position;
	extinguisherInstance.rotation = playerObject.transform.rotation;
	extinguisherInstance.Translate(0.4, -0.8, 0.9);
	extinguisherInstance.Rotate(-90, -90, 0);

	if(particleSystemInstance != null) {	
		particleSystemInstance.transform.position = playerObject.transform.position;
		particleSystemInstance.transform.rotation = playerObject.transform.rotation;
		particleSystemInstance.transform.Translate(0.4, -0.3, 1.15);
	}
}