#pragma strict

private var hasEntered : boolean = false;
private var init : boolean = false;
private var fireObject : GameObject;

function Start () {
	// This "Fires" object should contain all the fires to start. Only this parent object should be tagged "Fires"
	fireObject = GameObject.FindWithTag("Fires");
	
	// Initially all the fires will be inactive
	fireObject.SetActive(false);
	
	init = true;
}

function Update () {
	if(!init) {
		return;
	}
	
	// Start the fires only when the player enters this trigger zone
	if(hasEntered && StateManager.CurrentGameState() == GameState.EnterOffice) {
		fireObject.SetActive(true);
		StateManager.UpdateGameState(GameState.ExitBuilding);
	}
}

function OnTriggerEnter(col: Collider){
	// Only react to the player entering the trigger zone
	if(col.gameObject.tag == "Player") {
		hasEntered = true;
	}
}