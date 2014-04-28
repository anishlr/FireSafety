#pragma strict

public var lightTarget : GameObject;

private var stateManager : StateManager;
private var scoreManager : ScoreManager;

function OnTriggerEnter(col : Collider) {
	if(stateManager == null) {
		stateManager = GameObject.Find("State Manager").GetComponent(StateManager);
	}

	if(col.gameObject.tag == "Player" && stateManager.CurrentGameState() == GameState.ExitBuilding) {
		lightTarget.GetComponent(Light).enabled = true;
		Time.timeScale = 0;

		if(scoreManager == null) {
			scoreManager = GameObject.Find("Score Manager").GetComponent(ScoreManager);
		}

		scoreManager.UpdateScore(50, "exited safely!");
		stateManager.UpdateGameState(GameState.End);
	}
}