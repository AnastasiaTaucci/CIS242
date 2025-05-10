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
let calcButton = document.getElementById("calculate");

// set the form's default values

function setupForm() {
    calcButton.addEventListener("click", verifyInput); // add event listener to the button

    speedBox.addEventListener("blur", verifySpeed);
    angleBox.addEventListener("blur", verifyAngle);
    heightBox.addEventListener("blur", verifyHeight);

    speedBox.addEventListener("focus", function() {clearError(speedBox)});
    angleBox.addEventListener("focus", function() {clearError(angleBox)});
    heightBox.addEventListener("focus", function() {clearError(heightBox)});
}

function verifySpeed() {

    if (speedBox.value === "") {
        showError(speedBox, "Please enter speed.");
    } else if (speedBox.value <= 0) {
       showError(speedBox, "Speed must be greater that 0.");
    }
}

function verifyAngle() {
    if (angleBox.value === "") {
        showError(angleBox, "Please enter angle."); 
    } else if (angleBox.value < 0 || angleBox.value > 90) {
        showError(angleBox, "Angle must be between 0 and 90 degrees.");
    }
}

function verifyHeight() {
    if (heightBox.value === "") {
        showError(heightBox, "Please enter height.");
    } else if (heightBox.value < 0) {
        showError(heightBox, "Height must be greater or equal to 0.");
    }
}

function verifyInput() {
    document.querySelectorAll(".error-msg").forEach(el => el.remove());

    verifySpeed();
    verifyAngle();
    verifyHeight();

    if (document.querySelectorAll(".error-msg").length === 0) {
        calculateDistance();
    }
    
}

// Function to display an error message below an input field
function showError(inputElement, message) {
    var errorElement = document.createElement("p");
    errorElement.className = "error-msg";
    errorElement.textContent = message;
    inputElement.insertAdjacentElement("afterend", errorElement);
    document.getElementById("calc-result").innerHTML = "";
}

// Function to remove an error message for a specific input field
function clearError(element) {
    if (element.nextElementSibling.classList.contains("error-msg")) {
        element.nextElementSibling.remove();
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


