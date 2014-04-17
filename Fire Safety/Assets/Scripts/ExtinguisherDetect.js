﻿#pragma strict

// All times are in seconds

public var sweepThreshold : float = 5.0f;
public var distanceFromFire : float = 5.7f;
public var timeUntilCorrectPrompt : float = 2.0f;
public var timeRequiredToExtinguishFire : float = 3.0f;

private var extinguishTimer : float = 0.0f;
private var lastMousePos : Vector3 = Vector3.zero;
private var incorrectExtinguishTimer : float = 0.0f;

function Update() {
	if(Extinguisher.particleSystemInstance != null) {
		// If the extinguishing is happening close enough,
		if(Vector3.Distance(Extinguisher.particleSystemInstance.particleSystem.transform.position, gameObject.transform.position) < distanceFromFire) {
			// Get the difference between the current mouse position and the previous one
			var mousePosDifference : Vector3 = Input.mousePosition - lastMousePos;
			
			lastMousePos = Input.mousePosition;

			// If the player is moving the mouse in a sweeping motion,
			if(mousePosDifference.magnitude > sweepThreshold) {
				// Increment a timer to keep track of how long the player is doing this
				extinguishTimer += Time.deltaTime;
			}
			else {
				// Increment another timer to keep track of how long the player is incorrectly using the extinguisher
				incorrectExtinguishTimer += Time.deltaTime;
			}
		}
	}

	// When that correct timer reaches the max, then the fire is extinguished
	if(extinguishTimer >= timeRequiredToExtinguishFire) {
		particleSystem.Stop();
		gameObject.SetActive(false);
		extinguishTimer = 0.0f;
		StateManager.UpdateContextualState(ContextualState.None);
	}
	
	// When the incorrect extinguisher usage timer reaches the max, then we must prompt the user on how to use it correctly
	if(incorrectExtinguishTimer > timeUntilCorrectPrompt) {
		StateManager.UpdateContextualState(ContextualState.PromptCorrectExtinguisherUsage);
		incorrectExtinguishTimer = 0.0f;
	}
}

function OnTriggerEnter(col: Collider){
	// Only react to the player entering the trigger zone and trigger only when the player is trying to exit the building (i.e. the fires have started)
	if(col.gameObject.tag == "Player" && StateManager.CurrentGameState() == GameState.ExitBuilding) {
		if(Extinguisher.pickedUpExtinguisher) {
			StateManager.UpdateContextualState(ContextualState.CanUseExtinguisher);
		}
		else {
			StateManager.UpdateContextualState(ContextualState.MustFindExtinguisher);
		}
	}
}

function OnTriggerExit(col: Collider){
	StateManager.UpdateContextualState(ContextualState.None);
}