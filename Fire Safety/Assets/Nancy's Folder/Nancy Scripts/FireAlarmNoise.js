#pragma strict

private var scoreManager : ScoreManager;
private var stateManager : StateManager;
private var hasPulled : boolean = false;

public var firealarm : AudioClip;

private var hasEntered : boolean = false;

// Recognizes when player is near sink
function OnTriggerEnter(col : Collider) {
	if(stateManager == null) {
		stateManager = GameObject.Find("State Manager").GetComponent(StateManager);
	}

	if(stateManager.CurrentGameState() == GameState.ExitBuilding && col.gameObject.tag == "Player") {
		hasEntered = true;

		if(scoreManager == null) {
			scoreManager = GameObject.Find("Score Manager").GetComponent(ScoreManager);
		}
		if (hasPulled == false) {
			stateManager.UpdateContextualState(ContextualState.CanAlarm, false);		// false = message does not disappear after a while
		}
		else {
			stateManager.UpdateContextualState(ContextualState.AlreadyAlarm, false);	
		}
		
	}
}

// Exit sink trigger area
function OnTriggerExit(col: Collider){
	if(col.gameObject.tag == "Player") {
		hasEntered = false;
		if(stateManager != null) {
			stateManager.UpdateContextualState(ContextualState.None, false);				// false = message does not disappear after a while
		}
	}
}

function Update () {
	if(stateManager == null) {
		stateManager = GameObject.Find("State Manager").GetComponent(StateManager);
	}
	if(stateManager != null && stateManager.CurrentGameState() == GameState.ExitBuilding && hasEntered && Input.GetButtonDown("Interact")) {
		// Wet the rag
		if(scoreManager.pointsForAlarm == 0)
		{
		
			audio.PlayOneShot(firealarm);

			scoreManager.UpdateScore(30, "sounded the alarm!");
			scoreManager.pointsForAlarm = 1;
			hasPulled = true;
		}

	}

	
}