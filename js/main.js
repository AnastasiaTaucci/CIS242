"use strict"

// define constants
const GRAVITY = 9.8;
const PI = 3.14;

// setup the form when the page loads

window.addEventListener("load", setupForm);

/* global variables referencing text input elements */
let speedBox = document.getElementById("speed");
let angleBox = document.getElementById("angle");
let heightBox = document.getElementById("height");

// set the form's default values

function setupForm() {
    speedBox.value = "";
    angleBox.value = "";
    heightBox.value = "";

    speedBox.addEventListener("input", verifyInput);

    angleBox.addEventListener("input", verifyInput);

    heightBox.addEventListener("input", verifyInput);

}

// verify that entries are not empty, speed entry is greater than 0 and angle entry is between 0 and 90
function verifyInput() {
    document.getElementById("calc-result").innerHTML = "";
    document.getElementById("feedback").innerHTML = "";

    try {
        if (speedBox.value === "" || angleBox.value === "" || heightBox.value === "") {
            throw "Speed, angle, and height are required."
        } else if (speedBox.value <= 0) {
            throw "Speed must be greater that 0."
        } else if (angleBox.value < 0 || angleBox.value > 90) {
            throw "Angle must be between 0 and 90 degrees.";
        } else if (heightBox.value < 0) {
            throw "Heigh cannot be negative.";
        } else {
            document.getElementById("error").innerHTML = ""; // delete error message
            document.getElementById("calculate").addEventListener("click", calculateDistance); // add event listener to the button
        }

    } catch(error) {
        document.getElementById("error").innerHTML = error; //display error message
        document.getElementById("calculate").removeEventListener("click", calculateDistance); // make button inactive
    }
}


//calculate the distance

function calculateDistance() {
    let distance = 0;
    let mainDistance = 0;
    let additionalDistance = 0;
    let speed = speedBox.value;
    let angle = angleBox.value;
    let height = heightBox.value;
    let feedbackMsg = "";

    mainDistance = speed ** 2 * Math.sin(2 * convertToRadians(angle)) / GRAVITY;
    additionalDistance = speed * Math.cos(convertToRadians(angle)) / GRAVITY * Math.sqrt(2 * height / GRAVITY);
    distance = mainDistance + additionalDistance;

    feedbackMsg = provideFeedback(distance);

    document.getElementById("calc-result").innerHTML = "Your estimated throw distance is " + distance.toFixed(2) + " meters. " + feedbackMsg;

}


// convert degrees to radians
function convertToRadians(angle) {
    return angle * PI / 180;
}

// provide performance feedback

function provideFeedback(totalDistance) {
    let feedback = '';
    if (totalDistance < 50) {
        feedback = "Good start! Keep practicing for more distance.";
    } else if (totalDistance <= 100) {
        feedback = "Great job! You're getting there.";
    } else {
        feedback = "Amazing throw! You're a pro!";
    }

    return feedback;
}


