#pragma strict

public var escapeBtnText : String;
public var mainTextStyle : GUIStyle;
public var escapeBtnStyle : GUIStyle;
public var disappearAfterTime : float;
public var contextualTextStyle : GUIStyle;

private var mainText : String;
private var mainTextRect : Rect;
private var contextualText : String;
private var escapeBtnTextRect : Rect;
private var contextualTextRect : Rect;
private var shouldDisappearAfterTime : boolean;

function Start() {
	// Calculate the display rectangle to display the escape button hint at the top right of the screen
	var textSize : Vector2 = escapeBtnStyle.CalcSize(new GUIContent(escapeBtnText));
	escapeBtnTextRect = new Rect(5, 5, textSize.x, textSize.y);
}

function UpdateMainObjective(newObjectiveText : String) {
	mainText = newObjectiveText;

	// Calculate the display rectangle to display this objective at the top of the screen
	var textSize : Vector2 = mainTextStyle.CalcSize(new GUIContent(mainText));
	mainTextRect = new Rect(Screen.width / 2 - textSize.x / 2, 5, textSize.x, textSize.y + 5);
}

function UpdateContextualObjective(newObjectiveText : String, shouldDisappear : boolean) {
	contextualText = newObjectiveText;

	if(contextualText != "") {
		// Calculate the display rectangle to display this objective at the bottom of the screen
		var textSize : Vector2 = contextualTextStyle.CalcSize(new GUIContent(contextualText));
		contextualTextRect = new Rect(Screen.width / 2 - textSize.x / 2, Screen.height - (textSize.y + 5), textSize.x, textSize.y + 5);

		shouldDisappearAfterTime = shouldDisappear;
	}
}

function EraseContextualTextAfterTime() {
	yield WaitForSeconds(disappearAfterTime);
	contextualText = "";
	shouldDisappearAfterTime = false;
}

function OnGUI() {
	// Display the objectives (main and contextual)
	GUI.Label(mainTextRect, mainText, mainTextStyle);

	if(contextualText != "") {
		GUI.Label(contextualTextRect, contextualText, contextualTextStyle);

		if(shouldDisappearAfterTime) {
			EraseContextualTextAfterTime();
		}
	}

	// Display the escape button hint
	GUI.Label(escapeBtnTextRect, escapeBtnText, escapeBtnStyle);
}