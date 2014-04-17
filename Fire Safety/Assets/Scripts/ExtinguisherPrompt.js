#pragma strict

function OnTriggerEnter(col: Collider){
	// Only react to the player entering the trigger zone and trigger only when the player is trying to exit the building (i.e. the fires have started)
	if(col.gameObject.tag == "Player" && StateManager.CurrentGameState() == GameState.ExitBuilding) {
		StateManager.UpdateContextualState(ContextualState.MustUseExtinguisher);
	}
}

function OnTriggerExit(col: Collider){
	StateManager.UpdateContextualState(ContextualState.None);
}