#pragma strict

var width: int = 704;
var height: int = 256;
var skin: GUISkin;
 
private var rect: Rect;
private var show: boolean = false;
 
function Awake() {
    var x = (Screen.width * 0.5) - (width * 0.5);
    var y = (Screen.height * 0.5) - (height * 0.5);
    rect = Rect(x, y, width, height);    
}
 
function Update() {
    if (Input.GetKeyDown(KeyCode.Escape)) {
        show = !show;
    }    
}
 
function OnGUI() {
    GUI.skin = skin;    
    if (show) {
    Time.timeScale = 0;
        GUILayout.BeginArea(rect);
        GUILayout.Box("----- MENU -----");
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