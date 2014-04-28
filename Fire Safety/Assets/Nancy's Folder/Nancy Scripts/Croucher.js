#pragma strict

var walkSpeed: float = 7; 			// Regular speed
var crouchSpeed: float = 3; 		// Crouching speed

public static var isCrouching : boolean = false;
 
private var dist: float; 			// Distance to ground
private var tr: Transform;
private var chMotor: CharacterMotor;

 
function Start() {
    chMotor = GetComponent(CharacterMotor);
    tr = transform;
    var ch:CharacterController = GetComponent(CharacterController);
    dist = ch.height/2; // Calculate distance to ground
}
 
function Update() {
 
    var vScale = 1.0;
    var speed = walkSpeed;

	// Press C to crouch
    if (Input.GetKey(KeyCode.C)) {
        vScale = 0.5;
        speed = crouchSpeed; // Slow down when crouching
        isCrouching = true;
    }
    else {
    	vScale = 1.0;
    	speed = walkSpeed;
    	isCrouching = false;
    }

	// Set max speed
    chMotor.movement.maxForwardSpeed = speed;
    chMotor.movement.maxSidewaysSpeed = speed;
    chMotor.movement.maxBackwardsSpeed = speed;

	// Crouch/stand up smoothly
    var ultScale = tr.localScale.y;
    tr.localScale.y = Mathf.Lerp(tr.localScale.y, vScale, 5*Time.deltaTime);

    // Fix vertical position
    tr.position.y += dist * (tr.localScale.y - ultScale);
}