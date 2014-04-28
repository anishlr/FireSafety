#pragma strict

private var fireObject : GameObject;
private var stateManager : StateManager;

public var explosionSound : AudioClip;

function Start () {
	// This "Fires" object should contain all the fires to start. Only this parent object should be tagged "Fires"
	fireObject = GameObject.FindWithTag("Fires");

	// Initially all the fires will be inactive
	fireObject.SetActive(false);
}

function OnTriggerEnter(col: Collider){
	if(stateManager == null) {
		stateManager = GameObject.Find("State Manager").GetComponent(StateManager);
	}

	// Only react to the player entering the trigger zone
	if(col.gameObject.tag == "Player" && stateManager.CurrentGameState() == GameState.GoToDesk) {
		// Start the fires only when the player enters this trigger zone
		fireObject.SetActive(true);
		stateManager.UpdateGameState(GameState.ExitBuilding);
		audio.PlayOneShot(explosionSound);
	}
}