#pragma strict

function OnTriggerEnter(col: Collider){
	// Only react to the player entering the trigger zone
	if(col.gameObject.tag == "Player") {
		StateManager.UpdateContextualState(ContextualState.InSmoke, false);
	}
}

function OnTriggerExit(col: Collider){
	// Only react to the player exiting the trigger zone
	if(col.gameObject.tag == "Player") {
		StateManager.UpdateContextualState(ContextualState.None, false);
	}
}