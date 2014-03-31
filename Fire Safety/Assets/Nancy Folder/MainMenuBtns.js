#pragma strict

var levelToLoad : String;
var normalTexture : Texture2D;
var rollOverTexture : Texture2D;
var beep : AudioClip;
var quitButton : boolean = false;


function OnMouseEnter() {
	guiTexture.texture = rollOverTexture;
	
}

function OnMouseExit() {
	guiTexture.texture = normalTexture;
}

function OnMouseUp() {
	audio.PlayOneShot(beep);
	yield new WaitForSeconds (0.35);
	if(quitButton) {
		Application.Quit();
		Debug.Log("this will work when published to the desktop");
	}
	else {
		Application.LoadLevel(levelToLoad);
	}
		
}

@script RequireComponent(AudioSource)