"use strict";

function displayConfirmation() {
    let params = new URLSearchParams(window.location.search);

    let interests = params.getAll("interests");
    let formattedInterests = interests.length ? interests.join(", ") : "None";
    
    let confirmationDetails = `
        <li><strong>First Name:</strong> ${params.get("firstName")}</li>
        <li><strong>Last Name:</strong> ${params.get("lastName")}</li>
        <li><strong>Email:</strong> ${params.get("email")}</li>
        <li><strong>Event:</strong> ${params.get("event")}</li>
        <li><strong>Skill Level:</strong> ${params.get("skill")}</li>
        <li><strong>Interests:</strong> ${formattedInterests}</li>
        <li><strong>Comments:</strong> ${params.get("comments") || "No additional comments"}</li>
    `;

    document.getElementById("confirmation-details").innerHTML = confirmationDetails;
}

window.addEventListener("load", displayConfirmation);