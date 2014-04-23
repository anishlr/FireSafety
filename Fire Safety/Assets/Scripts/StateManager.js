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
	CanUseExtinguisher,
	PromptCorrectExtinguisherUsage,
	MustFindExtinguisher,
	CanOpenDoor,
	CanCloseDoor,
	CheckedDoorKnobAndDoorIsHot,
	CheckedDoorKnobAndDoorIsCold,
	UsingDryRag,
	InSmoke,
	CanUseSink,
	RagIsWet
};

private static var currentGameState : GameState;
private static var currentContextualState : ContextualState;
private static var objective : Objective;

function Start() {
	// Initial objective
	UpdateGameState(GameState.EnterOffice);
	UpdateContextualState(ContextualState.None, false);

	// Hide the cursor
	Screen.showCursor = false;
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

static function UpdateContextualState (newState : ContextualState, disappearAfterTime : boolean) {
	// Minor optimization
	if(currentContextualState == newState) {
		return;
	}
	
	currentContextualState = newState;
	switch(currentContextualState) {
		case ContextualState.None:
			/*isinSmoke = false;*/
			objective.UpdateContextualObjective("", disappearAfterTime);
			break;
			
		case ContextualState.CanPickUpExtinguisher:
			objective.UpdateContextualObjective("Press 'F' to pick up the extinguisher", disappearAfterTime);
			break;
			
		case ContextualState.CanUseExtinguisher:
			objective.UpdateContextualObjective("Press the left mouse button to dispense the extinguisher", disappearAfterTime);
			break;

		case ContextualState.PromptCorrectExtinguisherUsage:
			objective.UpdateContextualObjective("Remember to sweep the extinguisher from side to side to extinguish the fire.", disappearAfterTime);
			break;

		case ContextualState.MustFindExtinguisher:
			objective.UpdateContextualObjective("Oh no! Looks like we can't go any further. There must be a fire extinguisher nearby...", disappearAfterTime);
			break;
			
		case ContextualState.CanOpenDoor:
			if(currentGameState == GameState.EnterOffice) {
				objective.UpdateContextualObjective("Press 'F' to open the door", disappearAfterTime);
			}
			else {
				objective.UpdateContextualObjective("Press 'F' to open the door or press E to check the door knob's temperature", disappearAfterTime);
			}
			break;
			
		case ContextualState.CheckedDoorKnobAndDoorIsHot:
			objective.UpdateContextualObjective("The door knob is hot! Do not open the door.", disappearAfterTime);
			break;
			
		case ContextualState.CheckedDoorKnobAndDoorIsCold:
			objective.UpdateContextualObjective("The door knob is cold. Press 'F' to open the door.", disappearAfterTime);
			break;
			
		case ContextualState.CanCloseDoor:
			objective.UpdateContextualObjective("Press 'F' to close the door", disappearAfterTime);
			break;
			
		case ContextualState.CanUseSink:
			objective.UpdateContextualObjective("Press 'F' to wet your rag.", disappearAfterTime);
			break;
			
		case ContextualState.InSmoke: 
			objective.UpdateContextualObjective("We are in smoke. Prepare to die.", disappearAfterTime);
		break;
		
		case ContextualState.UsingDryRag:
			objective.UpdateContextualObjective("Your rag isn't as effective when dry! Maybe you could find a water source ...", disappearAfterTime);
			break;
		
		case ContextualState.RagIsWet:
			objective.UpdateContextualObjective("Your rag is wet. Let's go!", disappearAfterTime);
			break;
	}
}
