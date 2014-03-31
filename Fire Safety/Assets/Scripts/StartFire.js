#pragma strict

public var particle : GameObject;

private var hasEntered : boolean = false;
private var startedFire : boolean = false;
private var particleInstance: GameObject;

function Start () {
}

function Update () {
	if(hasEntered && !startedFire) {
		var execRoomDoorObject : GameObject = GameObject.FindWithTag("ExecutiveRoomDoor");
		particleInstance = Instantiate(particle, execRoomDoorObject.transform.position, execRoomDoorObject.transform.rotation);
		particleInstance.transform.Translate(0, -2, 2.5);
		particleInstance.transform.Rotate(-90, 0, 0);

		startedFire = true;
	}
}

function OnTriggerEnter(col: Collider){
	if(col.gameObject.tag == "Player") {
		hasEntered = true;
	}
}