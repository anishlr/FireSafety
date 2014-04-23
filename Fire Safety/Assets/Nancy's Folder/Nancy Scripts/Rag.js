#pragma strict

public static var isWet : boolean = false;
public static var isUsing : boolean = false;
public static var isWearing : boolean = false;

function Start() {
	// The rag is invisible at the beginning
	guiTexture.enabled = false;
}

function Update() {
	if (Input.GetKeyDown(KeyCode.Z)) {
		guiTexture.enabled = !guiTexture.enabled;
		isWearing = !isWearing;

		if(!isWearing) {
			StateManager.UpdateContextualState(ContextualState.None, false);		// false = doesn't disappear after a while
		}
	}

	if (isWearing == true && isWet == false) {
     	// Player has a dry rag on their face
     	StateManager.UpdateContextualState(ContextualState.UsingDryRag, true);		// true = disappears after a while
	}
}

static function Wet() {
	isWet = true;
	StateManager.UpdateContextualState(ContextualState.RagIsWet, true);				// true = message disappears after a while
}