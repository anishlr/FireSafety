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


//////// for controls

public var controlBtnText : String;
public var controlBtnStyle : GUIStyle;
private var controlBtnTextRect : Rect;
/////////////
 
function Awake() {
    var xo = (Screen.width * 0.5) - (width * 0.5);
    var yo = (Screen.height * 0.5) - (height * 0.5);
    rect = Rect(xo, yo, width, height);    
    
    //// for controls
    var textSize : Vector2 = controlBtnStyle.CalcSize(new GUIContent(controlBtnText));
	controlBtnTextRect = new Rect(5, 5, textSize.x, textSize.y);
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
    GUI.Label(controlBtnTextRect, controlBtnText, controlBtnStyle);
    Time.timeScale = 0;
        GUILayout.BeginArea(rect);

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