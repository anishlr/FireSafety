#pragma strict

private var hasEntered : boolean = false;
private var stateManager : StateManager;
private var scoreManager : ScoreManager;

private var usedWetRag : boolean = false;
private var usedDryRag : boolean = false;
private var didNotUseRag : boolean = false;
private var didNotCrouch : boolean = false;

public var smokebreath : AudioClip;

function OnTriggerEnter(col: Collider){
	// Only react to the player entering the trigger zone
	if(col.gameObject.tag == "Player") {
		hasEntered = true;
		audio.PlayOneShot(smokebreath);
		if(stateManager == null) {
			stateManager = GameObject.Find("State Manager").GetComponent(StateManager);
		}

		if(scoreManager == null) {
			scoreManager = GameObject.Find("Score Manager").GetComponent(ScoreManager);
		}

		stateManager.UpdateContextualState(ContextualState.MustCrouch, false);
	}
}

function OnTriggerExit(col: Collider) {
	// Only react to the player exiting the trigger zone
	if(col.gameObject.tag == "Player") {
		audio.Stop();
		hasEntered = false;
		stateManager.UpdateContextualState(ContextualState.None, false);
		
		if(didNotCrouch) {
			scoreManager.UpdateScore(-10, "not crouching through smoke");
		}
		
		if(usedWetRag) {
			scoreManager.UpdateScore(10, "using a wet rag through smoke");
		}
		
		if(usedDryRag) {
			scoreManager.UpdateScore(5, "using a dry rag through smoke");
		}
		
		if(didNotUseRag) {
			scoreManager.UpdateScore(-5, "not using a rag through smoke");
		}
	}
}

function Update() {
	if(hasEntered) {
		if (stateManager.CurrentGameState() != GameState.End){ // prevent from subtraction of points at end
			if(Croucher.isCrouching) {
				if(Rag.isWearing) {
					if(Rag.isWet) {
						stateManager.UpdateContextualState(ContextualState.None, false);
						usedWetRag = true;
					}
					else {
						stateManager.UpdateContextualState(ContextualState.UsingDryRag, false);
						usedDryRag = true;
					}
				}
				else {
					stateManager.UpdateContextualState(ContextualState.MustUseRag, false);
					didNotUseRag = true;
				}
			}
			else {
				if (stateManager.CurrentGameState() == GameState.ExitBuilding) {
					stateManager.UpdateContextualState(ContextualState.MustCrouch, false);
					didNotCrouch = true;
				}
			}
		}
	}
}