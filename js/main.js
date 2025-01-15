// define constants
const GRAVITY = 9.8;
const PI = 3.14;

// setup the form when the page loads

window.addEventListener("load", setupForm);

// set the form's default values

function setupForm() {
    document.getElementById("speed").value = 0;
    document.getElementById("angle").value = 0;
}

// add event listener to the button

document.getElementById("calculate").addEventListener("click", calculateDistance);

//calculate the distance

function calculateDistance() {
    let distance = 0;
    let speed = document.getElementById("speed").value;
    let angle = document.getElementById("angle").value;

    distance = speed ** 2 * Math.sin(2 * convertToRadians(angle)) / GRAVITY;

    document.getElementById("calc-result").innerHTML = "Your estimated throw distance is " + distance.toFixed(2) + " meters.";
}


// convert degrees to radians
function convertToRadians(angle) {
    return angle * PI / 180;
}