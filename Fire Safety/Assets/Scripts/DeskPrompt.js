#pragma strict

private var stateManager : StateManager;

function OnTriggerEnter(col: Collider){
	if(stateManager == null) {
		stateManager = GameObject.Find("State Manager").GetComponent(StateManager);
	}

	// Only react to the player entering the trigger zone
	if(col.gameObject.tag == "Player" && stateManager.CurrentGameState() == GameState.EnterOffice) {
		stateManager.UpdateGameState(GameState.GoToDesk);
	}
}