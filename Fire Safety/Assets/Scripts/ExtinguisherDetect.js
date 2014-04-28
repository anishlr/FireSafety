#pragma strict

// All times are in seconds

public var sweepThreshold : float = 5.0f;
public var distanceFromFire : float = 5.7f;
public var extinguishedFireDelay : float = 6.0f;
public var timeUntilCorrectPrompt : float = 2.0f;
public var particleCountScaleFactor : float = 1.008f;
public var minimumParticleEmissionRate : float = 10.0f;
public var incorrectFireExtinguisherUsageCount : int = 0;
public var incorrectFireExtinguisherUsageThreshold : int = 5;

private var maxEmissionRate : float;
private var stateManager : StateManager;
private var scoreManager : ScoreManager;
private var lastMousePos : Vector3 = Vector3.zero;
private var incorrectExtinguishTimer : float = 0.0f;

function Start() {
	maxEmissionRate = gameObject.particleSystem.emissionRate;
}

function Update() {
	if(Extinguisher.particleSystemInstance != null) {
		// If the extinguishing is happening close enough,
		if(Vector3.Distance(Extinguisher.particleSystemInstance.particleSystem.transform.position, gameObject.transform.position) < distanceFromFire) {
			// Get the difference between the current mouse position and the previous one
			var mousePosDifference : Vector3 = Input.mousePosition - lastMousePos;
			
			lastMousePos = Input.mousePosition;

			// If the player is moving the mouse in a sweeping motion,
			if(mousePosDifference.magnitude > sweepThreshold) {
				// Decrease the particle emission rate to make it look like the fire's being extinguished
				gameObject.particleSystem.emissionRate /= particleCountScaleFactor;
			}
			else {
				// Increment another timer to keep track of how long the player is incorrectly using the extinguisher
				incorrectExtinguishTimer += Time.deltaTime;
			}
		}

		// When the particle emission rate reaches 0, then the fire is extinguished
		if(gameObject.particleSystem.emissionRate <= minimumParticleEmissionRate) {
			particleSystem.Stop();
			gameObject.SetActive(false);
			stateManager.UpdateContextualState(ContextualState.None, false);
			scoreManager.UpdateScore(10, "Extinguished a fire");
		}
		
		// When the incorrect extinguisher usage timer reaches the max, then we must prompt the user on how to use it correctly
		if(incorrectExtinguishTimer > timeUntilCorrectPrompt) {
			stateManager.UpdateContextualState(ContextualState.PromptCorrectExtinguisherUsage, false);
			incorrectExtinguishTimer = 0.0f;
			incorrectFireExtinguisherUsageCount++;

			if(incorrectFireExtinguisherUsageCount > incorrectFireExtinguisherUsageThreshold) {
				scoreManager.UpdateScore(-5, "Incorrectly used the fire extinguisher");
			}
		}
	}
}

function OnTriggerEnter(col: Collider){
	// Only react to the player entering the trigger zone and trigger only when the player is trying to exit the building (i.e. the fires have started)
	if(stateManager == null) {
		stateManager = GameObject.Find("State Manager").GetComponent(StateManager);
	}

	if(scoreManager == null) {
		scoreManager = GameObject.Find("Score Manager").GetComponent(ScoreManager);
	}

	if(col.gameObject.tag == "Player" && stateManager.CurrentGameState() == GameState.ExitBuilding) {
		if(Extinguisher.pickedUpExtinguisher) {
			stateManager.UpdateContextualState(ContextualState.CanUseExtinguisher, false);
		}
		else {
			stateManager.UpdateContextualState(ContextualState.MustFindExtinguisher, false);
		}
	}
}

function OnTriggerExit(col: Collider){
	if(stateManager == null) {
		stateManager = GameObject.Find("State Manager").GetComponent(StateManager);
	}

	stateManager.UpdateContextualState(ContextualState.None, false);
}