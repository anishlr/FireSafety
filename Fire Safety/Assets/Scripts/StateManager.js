#pragma strict

// All the possible states of the game (keeps track of the main objective)
enum GameState {
	None,
	EnterOffice,
	GoToDesk,
	ExitBuilding,
	Paused,
	End
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
	MustUseRag,
	NoDangerUsingDryRag,
	UsingDryRag,
	MustCrouch,
	CanUseSink,
	RagIsWet,
	DontNeedSink,
	CanAlarm,
	AlreadyAlarm
};

private var objective : Objective;
private var scoreManager : ScoreManager;
public var currentGameState : GameState;
private var currentContextualState : ContextualState;

public var DidEnd : boolean=false;

function Start() {
	// Initial objective
	UpdateGameState(GameState.EnterOffice);
	UpdateContextualState(ContextualState.None, false);

	// Hide the cursor
	Screen.showCursor = false;
}

// Main objective related functions
function CurrentGameState() : GameState {
	return currentGameState;
}

function UpdateGameState (newState : GameState) {
	// Minor optimization
	if(currentGameState == newState) {
		return;
	}

	if(objective == null) {
		objective = GetComponent(Objective);
	}

	currentGameState = newState;
	switch(currentGameState) {
		case GameState.EnterOffice:
			objective.UpdateMainObjective("Looks like I'm late for work. I need to get to my office on the second floor.");
			break;
		
		case GameState.GoToDesk:
			objective.UpdateMainObjective("What a beautiful day! Time to get started with work. (Go to your desk)");
			break;
			
		case GameState.ExitBuilding:
			objective.UpdateMainObjective("Oh no! A fire has broken out! We must exit the building!");
			break;
			
		case GameState.Paused:
			objective.UpdateMainObjective("Game paused");
			break;
			
		case GameState.End:
			objective.UpdateMainObjective("Phew, looks like we escaped the fire!");
			objective.UpdateContextualObjective("", false);
			DidEnd=true;
			break;
	}
}

// Contextual objective related functions
function CurrentContextualState() : ContextualState {
	return currentContextualState;
}

function UpdateContextualState (newState : ContextualState, disappearAfterTime : boolean) {
	// Minor optimization
	if(currentContextualState == newState) {
		return;
	}

	if(objective == null) {
		objective = GetComponent(Objective);
	}
	
	if(scoreManager == null) {
		scoreManager = GameObject.Find("Score Manager").GetComponent(ScoreManager);
	}

	currentContextualState = newState;
	switch(currentContextualState) {
		case ContextualState.None:
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
			scoreManager.UpdateScore(5, "checked a door handle");
			
			break;
		
			
		case ContextualState.CheckedDoorKnobAndDoorIsCold:
		
			objective.UpdateContextualObjective("The door knob is cold. Press 'F' to open the door.", disappearAfterTime);
			scoreManager.UpdateScore(5, "checked a door handle");
			
			break;
		
			
		case ContextualState.CanCloseDoor:
			objective.UpdateContextualObjective("Press 'F' to close the door", disappearAfterTime);
			break;
			
		case ContextualState.CanUseSink:
			objective.UpdateContextualObjective("Press 'F' to wet your rag.", disappearAfterTime);
		break;
		
		case ContextualState.CanAlarm:
			objective.UpdateContextualObjective("Press 'F' to pull the fire alarm.", disappearAfterTime);
		break;
		
		case ContextualState.AlreadyAlarm:
			objective.UpdateContextualObjective("Good job! You've already activated this!", disappearAfterTime);
		break;
		
		case ContextualState.DontNeedSink:
			objective.UpdateContextualObjective("Don't waste water! You don't need to use the sink just yet ...", disappearAfterTime);
		break;
		
		case ContextualState.MustCrouch: 
			objective.UpdateContextualObjective("This smoke is too dense. Press 'C' to crouch.", disappearAfterTime);
		break;
			
		case ContextualState.MustUseRag: 
			objective.UpdateContextualObjective("There is dense smoke around. It is hazardous to breathe the air. Press 'Z' to cover your mouth with the rag.", disappearAfterTime);
		break;
		
		case ContextualState.NoDangerUsingDryRag:
			objective.UpdateContextualObjective("Hm, a dry rag ... this may come in handy.", disappearAfterTime);
			break;
			
		case ContextualState.UsingDryRag:
			objective.UpdateContextualObjective("This rag isn't as effective when dry! Maybe you could find a water source ...", disappearAfterTime);
			break;
		
		case ContextualState.RagIsWet:
			objective.UpdateContextualObjective("Your rag is wet. Let's go!", disappearAfterTime);
			break;
	}
}
