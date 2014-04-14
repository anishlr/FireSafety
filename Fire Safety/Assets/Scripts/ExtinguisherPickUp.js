﻿#pragma strict

public var particle : GameObject;
public var extinguisher : Transform;
public var extinguisherBoxOpen : Texture;

private var playerObject : GameObject;
private var hasEntered : boolean = false;
private var extinguisherInstance: Transform;
private var particleSystemInstance: GameObject;
private var pickedUpExtinguisher : boolean = false;

function Start () {
}

function Update () {
	HandleUserInput();
	
	if(pickedUpExtinguisher) {
		StateManager.UpdateContextualState(ContextualState.PickedUpExtinguisher);
		
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
	else if (pickedUpExtinguisher && Input.GetButtonDown("Fire1")) {
		particleSystemInstance = Instantiate(particle, playerObject.transform.position, playerObject.transform.rotation);
		particleSystemInstance.gameObject.tag = "ExtinguisherContents";
	}
	else if(pickedUpExtinguisher && Input.GetButtonUp("Fire1"))	{
		Destroy(particleSystemInstance);
	}		
}

function UpdateExtinguisherPosition() {
	extinguisherInstance.position = playerObject.transform.position;
	extinguisherInstance.rotation = playerObject.transform.rotation;
	extinguisherInstance.Translate(0.4, -0.8, 0.9);
	extinguisherInstance.Rotate(-90, 90, 0);

	if(particleSystemInstance != null) {	
		particleSystemInstance.transform.position = playerObject.transform.position;
		particleSystemInstance.transform.rotation = playerObject.transform.rotation;
		particleSystemInstance.transform.Translate(0.4, -0.3, 1.15);
	}
}