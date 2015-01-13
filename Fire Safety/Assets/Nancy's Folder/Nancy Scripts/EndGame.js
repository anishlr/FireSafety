#pragma strict

public var lightTarget : GameObject;

private var stateManager : StateManager;
private var scoreManager : ScoreManager;


function OnTriggerEnter(col : Collider) {
	if(stateManager == null) {
		stateManager = GameObject.Find("State Manager").GetComponent(StateManager);
	}

	if(col.gameObject.tag == "Player" && stateManager.CurrentGameState() == GameState.ExitBuilding) {
		//lightTarget.GetComponent(Light).enabled = true;
		Time.timeScale = 0;
	stateManager.UpdateContextualState(ContextualState.None, false);
	
	
		if(scoreManager == null) {
			scoreManager = GameObject.Find("Score Manager").GetComponent(ScoreManager);
		}
		
		
		
		
		stateManager.UpdateGameState(GameState.End);
		scoreManager.UpdateScore(50, " safely!");
	}
}