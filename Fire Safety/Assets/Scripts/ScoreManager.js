#pragma strict
import System.Collections.Generic;

public var pointsForSink : int;
public var pointsForCrouching : int;
public var pointsForRag : int;
public var pointsForAlarm : int;

public var scoreTextStyle : GUIStyle;
public var disappearAfterTime : float = 3.0f;

private var height : int;
private var score : int;
private var scoreText : String;
private var ScoreTextFinal : String;
private var scoreTextRect : Rect;
private var updatedScore : boolean;
private var stateManager : StateManager;
private var scoreList : List.<String> = new List.<String>(); //list of strings printed at the end of the game

function Start () {
	pointsForCrouching = 0;
	pointsForSink = 0;
	pointsForRag = 0;
	pointsForAlarm = 0;
}

function UpdateScore(change : int, text : String) {
	score += change;
	if(change >= 0) {
		scoreList.Add("+" + change + ", " + text);
		scoreText = "+" + change + ", " + text;
	}
	else {
		scoreList.Add(change + ", " + text);
		scoreText = change + ", " + text;
	}

	updatedScore = true;

	if(stateManager == null) {
		stateManager = GameObject.Find("State Manager").GetComponent(StateManager);
	}
	
	var textSize : Vector2 = scoreTextStyle.CalcSize(new GUIContent(scoreText));
	scoreTextRect = new Rect(Screen.width / 2 - textSize.x / 2, 50, textSize.x, textSize.y);
}

function EraseScoreTextAfterTime() {
	yield WaitForSeconds(disappearAfterTime);
	scoreText = "";
	updatedScore = false;
}

function OnGUI() {
	height = 80;
	
	if(stateManager != null && stateManager.CurrentGameState() == GameState.End)
	{
		for(var i = 0; i < scoreList.Count; i++)
		{
			if(scoreList[i] != "")
			{
				// Calculate the display rectangle to display the score history at the center
				var textSize : Vector2 = scoreTextStyle.CalcSize(new GUIContent(scoreList[i]));
				var rect = new Rect(Screen.width / 2 - textSize.x / 2, height, textSize.x, textSize.y);
				height += textSize.y + 5;
				
				GUI.Label(rect, scoreList[i], scoreTextStyle);
			}
		}
		height += textSize.y + 5;
		ScoreTextFinal= " Your Total Score is : ";
		ScoreTextFinal= ScoreTextFinal + score.ToString();
		textSize = scoreTextStyle.CalcSize(new GUIContent(ScoreTextFinal));
		rect = new Rect(Screen.width / 2 - textSize.x / 2, height, textSize.x, textSize.y);
		
		GUI.Label(rect, ScoreTextFinal, scoreTextStyle);
	}
	else if(updatedScore) {
		GUI.Label(scoreTextRect, scoreText, scoreTextStyle);
		EraseScoreTextAfterTime();
	}
}