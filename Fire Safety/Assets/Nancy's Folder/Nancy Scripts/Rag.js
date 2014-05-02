#pragma strict

public static var isWet : boolean = false;
public static var isUsing : boolean = false;
public static var isWearing : boolean = false;

private var stateManager : StateManager;
private var scoreManager : ScoreManager;
private var wetpoints : int = 0;


function Update() {
	//if(stateManager != null && stateManager.CurrentGameState() == GameState.ExitBuilding) {
		if (Input.GetKeyDown(KeyCode.Z)) {
			guiTexture.enabled = !guiTexture.enabled;
			isWearing = !isWearing;
			
			if(scoreManager == null) {
				scoreManager = GameObject.Find("Score Manager").GetComponent(ScoreManager);
			}

			if(scoreManager.pointsForRag == 0)
			{
				scoreManager.UpdateScore(10, "discovered rag");
				scoreManager.pointsForRag = 10;
			}
			
			if (isWearing == true && isWet == true && wetpoints == 0) { // wearing a wet rag
				scoreManager.UpdateScore(10, "wet rag");
				scoreManager.pointsForRag = 10;
				wetpoints = 1;
			}

			if(!isWearing) {
				if(stateManager == null) {
					stateManager = GameObject.Find("State Manager").GetComponent(StateManager);
				}
				stateManager.UpdateContextualState(ContextualState.None, false);		// false = doesn't disappear after a while
			}
		}

		if (isWearing == true && isWet == false) {
	     	// Player has a dry rag on their face
			if(stateManager == null) {
				stateManager = GameObject.Find("State Manager").GetComponent(StateManager);
			}
			if (stateManager.CurrentGameState() == GameState.ExitBuilding) {
	     	stateManager.UpdateContextualState(ContextualState.UsingDryRag, true);		// true = disappears after a while
	     	} else { 
	     	stateManager.UpdateContextualState(ContextualState.NoDangerUsingDryRag, true);	
	     	}
	     	
		}
	//}
}

function Wet() {
	if(stateManager != null && stateManager.CurrentGameState() == GameState.ExitBuilding) {
		isWet = true;

		if(stateManager == null) {
			stateManager = GameObject.Find("State Manager").GetComponent(StateManager);
		}

		stateManager.UpdateContextualState(ContextualState.RagIsWet, true);				// true = message disappears after a while
	}
}