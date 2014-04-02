#pragma strict

// All the possible states of the game (keeps track of the main objective)
enum GameState {
	None,
	EnterOffice,
	ExitBuilding
};

// All the possible contextual states (keeps track of contextual objectives)
enum ContextualState {
	None,
	CanPickUpExtinguisher,
	PickedUpExtinguisher,
	MustUseExtinguisher,
	CanOpenDoor,
	CanCloseDoor,
	CheckedDoorKnobAndDoorOpen,
	CheckedDoorKnobAndDoorClosed
};

private static var currentGameState : GameState;
private static var currentContextualState : ContextualState;

private static var objective : Objective;

function Start() {
	// Initial objective
	UpdateGameState(GameState.EnterOffice);
	UpdateContextualState(ContextualState.None);
}


// Main objective related functions
static function CurrentGameState() : GameState {
	return currentGameState;
}

static function UpdateGameState (newState : GameState) {
	// Minor optimization
	if(currentGameState == newState) {
		return;
	}
	
	currentGameState = newState;
	switch(currentGameState) {
		case GameState.EnterOffice:
			objective.UpdateMainObjective("Enter your office which is located on the second floor");
			break;
			
		case GameState.ExitBuilding:
			objective.UpdateMainObjective("Exit the building!");
			break;
	}
}


// Contextual objective related functions
static function CurrentContextualState() : ContextualState {
	return currentContextualState;
}

static function UpdateContextualState (newState : ContextualState) {
	// Minor optimization
	if(currentContextualState == newState) {
		return;
	}
	
	currentContextualState = newState;
	switch(currentContextualState) {
		case ContextualState.None:
			objective.UpdateContextualObjective("");
			break;
			
		case ContextualState.CanPickUpExtinguisher:
			objective.UpdateContextualObjective("Press F to pick up the extinguisher");
			break;
			
		case ContextualState.PickedUpExtinguisher:
			objective.UpdateContextualObjective("Press left mouse button to dispense the extinguisher");
			break;
			
		case ContextualState.MustUseExtinguisher:
			objective.UpdateContextualObjective("Oh no! Looks like we're stuck. There must be a fire extinguisher nearby...");
			break;
			
		case ContextualState.CanOpenDoor:
			objective.UpdateContextualObjective("Press F to open the door or press E to check the door knob");
			break;
			
		case ContextualState.CheckedDoorKnobAndDoorOpen:
			objective.UpdateContextualObjective("Door checked. Press F to close the door. TODO: Let the user know if the door handle is hot/cold");
			break;
			
		case ContextualState.CheckedDoorKnobAndDoorClosed:
			objective.UpdateContextualObjective("Door checked. Press F to open the door. TODO: Let the user know if the door handle is hot/cold");
			break;
			
		case ContextualState.CanCloseDoor:
			objective.UpdateContextualObjective("Press F to close the door");
			break;
	}
}