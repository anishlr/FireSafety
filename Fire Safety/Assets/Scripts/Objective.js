#pragma strict

// Variables for inspector (kinda hacky)
public var mainTextStyle : GUIStyle;
public var contextualTextStyle : GUIStyle;
public var disappearAfterTime : float;

public static var mainTextStyle_st : GUIStyle;
public static var contextualTextStyle_st : GUIStyle;

private static var mainText : String;
private static var mainTextRect : Rect;
private static var contextualText : String;
private static var contextualTextRect : Rect;

private static var shouldDisappearAfterTime : boolean;

function Awake() {
	mainTextStyle_st = mainTextStyle;
	contextualTextStyle_st = contextualTextStyle;
}

static function UpdateMainObjective(newObjectiveText : String) {
	mainText = newObjectiveText;

	// Calculate the display rectangle to display this objective at the top of the screen
	var textSize : Vector2 = mainTextStyle_st.CalcSize(new GUIContent(mainText));
	mainTextRect = new Rect(Screen.width / 2 - textSize.x / 2, 5, textSize.x, textSize.y);
}

static function UpdateContextualObjective(newObjectiveText : String, shouldDisappear : boolean) {
	contextualText = newObjectiveText;

	if(contextualText != "") {
		// Calculate the display rectangle to display this objective at the bottom of the screen
		var textSize : Vector2 = contextualTextStyle_st.CalcSize(new GUIContent(contextualText));
		contextualTextRect = new Rect(Screen.width / 2 - textSize.x / 2, Screen.height - (textSize.y + 5), textSize.x, textSize.y);

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
}