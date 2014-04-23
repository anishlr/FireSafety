#pragma strict

private var playerObject : GameObject;
private var hasEntered : boolean = false;
private var usingSink : boolean = false;

// Recognizes when player is near sink
function OnTriggerEnter(col : Collider) {
	if(col.gameObject.tag == "Player") {
		hasEntered = true;
		StateManager.UpdateContextualState(ContextualState.CanUseSink, false);		// false = message does not disappear after a while
	}
}

// Exit sink trigger area
function OnTriggerExit(col: Collider){
	hasEntered = false;
	usingSink = false;
	StateManager.UpdateContextualState(ContextualState.None, false);				// false = message does not disappear after a while
}

function Update () {
	if(hasEntered && Input.GetButtonDown("Interact")){
		// Wet the rag
		Rag.Wet();
	}
}