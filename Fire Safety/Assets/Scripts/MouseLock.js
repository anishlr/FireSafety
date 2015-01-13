#pragma strict
private var isLocked : boolean;

function Start () {
SetCursorLock(true);
}

function SetCursorLock(isLocked : boolean)
{
this.isLocked= isLocked;
Screen.lockCursor=isLocked;
Screen.showCursor=!isLocked;
}

function Update () {
if (Input.GetKeyDown(KeyCode.Escape))
{
SetCursorLock(false);
}
}