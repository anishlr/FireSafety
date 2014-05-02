#pragma strict

private var rag : Rag;
private var playerObject : GameObject;
private var stateManager : StateManager;
private var scoreManager : ScoreManager;
private var usingSink : boolean = false;
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

		if(rag == null) {
			rag = GameObject.Find("Rag").GetComponent(Rag);
		}

		stateManager.UpdateContextualState(ContextualState.CanUseSink, false);		// false = message does not disappear after a while
	}
	else {
	if(stateManager.CurrentGameState() != GameState.ExitBuilding && col.gameObject.tag == "Player") {
		hasEntered = true;
		stateManager.UpdateContextualState(ContextualState.DontNeedSink, true);	
		}
	}
}

// Exit sink trigger area
function OnTriggerExit(col: Collider){
	if(col.gameObject.tag == "Player") {
		hasEntered = false;
		usingSink = false;

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
		if(scoreManager.pointsForSink == 0)
		{
			Rag.isWet = true;
			scoreManager.UpdateScore(10, "wet the rag!");
			scoreManager.pointsForSink = 1;
		}

		rag.Wet();
	}

	
}