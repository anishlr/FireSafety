#pragma strict

public var skin: GUISkin;
public var width: int = 704;
public var height: int = 256;
public var aTexture : Texture; 
 
private var rect: Rect;
private var show: boolean = false;
private var toggleTxt : boolean = false;
private var savedGameState : GameState;
private var stateManager : StateManager;
 
function Awake() {
    var x = (Screen.width * 0.5) - (width * 0.5);
    var y = (Screen.height * 0.5) - (height * 0.5);
    rect = Rect(x, y, width, height);    
}
 
function Update() {
    if (Input.GetKeyDown(KeyCode.Escape)) {
        show = !show;
        if (show == false) {
        	Time.timeScale = 1;
        	// Hide the cursor
        	Screen.showCursor = false;

			// Restore the game state
			stateManager.UpdateGameState(savedGameState);
        }
        else {
			// Show the cursor
			Screen.showCursor = true;

			if(stateManager == null) {
				stateManager = GameObject.Find("State Manager").GetComponent(StateManager);
			}

			// Save the current game state and update it
			savedGameState = stateManager.CurrentGameState();
			stateManager.UpdateGameState(GameState.Paused);
        }
    }    
}
 
function OnGUI() {
    GUI.skin = skin;    
    if (show) {
    Time.timeScale = 0;
        GUILayout.BeginArea(rect);
        if (GUILayout.Button("Press F to use sinks. Z to toggle rag. C to crouch.")) {
         	show = false;
         	Time.timeScale = 1;
        }
        if (GUILayout.Button("Continue")) {
         	show = false;
         	Time.timeScale = 1;
        }
        if (GUILayout.Button("Restart")) {
        	show = false;
         	Time.timeScale = 1;
            Application.LoadLevel("Office");
        }
        if (GUILayout.Button("Quit")) {
        	show = false;
         	Time.timeScale = 1;
            Application.LoadLevel("OpeningScene");
        }
        GUILayout.EndArea();
    }
}