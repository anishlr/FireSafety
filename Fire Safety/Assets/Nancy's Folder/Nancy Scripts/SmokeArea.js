#pragma strict

private var hasEntered : boolean = false;
private var stateManager : StateManager;
private var scoreManager : ScoreManager;

function OnTriggerEnter(col: Collider){
	// Only react to the player entering the trigger zone
	if(col.gameObject.tag == "Player") {
		hasEntered = true;

		if(stateManager == null) {
			stateManager = GameObject.Find("State Manager").GetComponent(StateManager);
		}

		if(scoreManager == null) {
			scoreManager = GameObject.Find("Score Manager").GetComponent(ScoreManager);
		}

		stateManager.UpdateContextualState(ContextualState.MustCrouch, false);
	}
}

function OnTriggerExit(col: Collider){
	// Only react to the player exiting the trigger zone
	if(col.gameObject.tag == "Player") {
		hasEntered = false;
		stateManager.UpdateContextualState(ContextualState.None, false);
	}
}

function Update() {
	if(hasEntered) {
		if(Croucher.isCrouching) {
			if(Rag.isWearing) {
				if(Rag.isWet) {
					stateManager.UpdateContextualState(ContextualState.None, false);
					scoreManager.UpdateScore(10, "using a wet rag through smoke");
				}
				else {
					stateManager.UpdateContextualState(ContextualState.UsingDryRag, false);
					scoreManager.UpdateScore(5, "using a dry rag through smoke");
				}
			}
			else {
				stateManager.UpdateContextualState(ContextualState.MustUseRag, false);
				scoreManager.UpdateScore(-5, "not using a rag through smoke");
			}
		}
		else {
			stateManager.UpdateContextualState(ContextualState.MustCrouch, false);
			scoreManager.UpdateScore(-10, "not crouching through smoke");
		}
	}
}