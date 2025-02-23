"use strict";

let eventTableBody = document.getElementById("event-table-body");

let form = document.getElementById('event-form');
// let feedback = document.getElementById("form-feedback");
let checkboxes = document.querySelectorAll("fieldset input[type='checkbox']");
let displayInterests = document.getElementById("display-interest");

let selectedInterests = [];

// populating dropdown for event selection
function populateDropdown() {
    events.forEach(event => {
        let option = document.createElement("option");
        option.value = event.name;
        option.textContent = event.name;
        document.getElementById("event").appendChild(option);
    })
}

window.addEventListener("load", populateDropdown);

window.addEventListener("load", () => {
    document.getElementById("first-name").value = sessionStorage.getItem("firstName") || "";
    document.getElementById("last-name").value = sessionStorage.getItem("lastName") || "";
    document.getElementById("email").value = sessionStorage.getItem("email") || "";
    document.getElementById("comments").value = sessionStorage.getItem("comments") || "";
    document.getElementById("event").value = sessionStorage.getItem("event") || "";

    let storedSkill = sessionStorage.getItem("skillLevel");
    if (storedSkill) {
        document.querySelector(`input[name="skill"][value="${storedSkill}"]`).checked = true;
    }

    let storedInterests = JSON.parse(sessionStorage.getItem("interests")) || [];
    checkboxes.forEach((checkbox) => {
        if (storedInterests.includes(checkbox.value)) {
            checkbox.checked = true;
        }
    })

    selectedInterests = storedInterests;

    updateDisplayInterests();
})

// storing event data
let eventData = [
    {name: "Parmageddon Doubles II", date: "January 25, 2025", location: "Kayak Point Disc Golf Resort" },
    {name: "March Badness Doubles", date: "March 1, 2025", location: "Skyline Golf Course" },
    {name: "Mossy Roc Ice Bowl", date: "March 9, 2025", location: "Mossy Roc in Sudden Valley" }
];

// creating instances of event
let events = [];
eventData.forEach(event => {
    events.push(new Event(event.name, event.date, event.location));
});


// populating events table
function populateTable() {
    events.forEach(event => {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${event.name}</td>
            <td>${event.date}</td>
            <td>${event.location}</td>
        `;

        eventTableBody.appendChild(row);
    })
}

window.addEventListener("load", populateTable);

// email validation 
let email = document.getElementById('email');
email.addEventListener('invalid', (e) => {
    validateEmail();
})

// update sessionStorage when input fields change
form.addEventListener("input", () => {
    sessionStorage.setItem("firstName", document.getElementById("first-name").value);
    sessionStorage.setItem("lastName", document.getElementById("last-name").value);
    sessionStorage.setItem("email", document.getElementById("email").value);
    sessionStorage.setItem("comments", document.getElementById("comments").value);
    sessionStorage.setItem("event", document.getElementById("event").value);

    let skill = document.querySelector('input[name="skill"]:checked');
    if (skill) sessionStorage.setItem("skillLevel", skill.value);

})


form.addEventListener('submit', (e) => { 

    console.log("on submit validation")
    validateEmail(e);

    let interests = [];
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            interests.push(checkbox.value);
        }
    })

    let registrationData = {
        firstName: document.getElementById("first-name").value,
        lastName: document.getElementById("last-name").value,
        email: document.getElementById("email").value,
        event: document.getElementById("event").value,
        skillLevel: document.querySelector('input[name="skill"]:checked').value,
        interests: interests,
        comments: document.getElementById("comments").value,
    };
    
    sessionStorage.clear();
    


    // let nameElement = document.getElementById("first-name");
    // const name = nameElement.value.trim();
    
    // let selectedEventName = document.getElementById("event").value;

    // let selectedEvent = events.find(event => {
    //     return event.name === selectedEventName;
    // })

    // //register participants
    // let registrationMessage = selectedEvent ? selectedEvent.registerParticipant(name) : "Event not found";
    
    // feedback.innerHTML = `${registrationMessage} <br><br> ${selectedEvent.getDetails()}`;

    
});




// validate email function

function validateEmail(e) {
    console.log("beginning of function")
    if (email.validity.valueMissing) {
        e.preventDefault();
        email.setCustomValidity("Enter your email");
    } else if (checkEmail(email.value) === false) {
        e.preventDefault();
        email.setCustomValidity("Enter a valid email");
    } else {console.log("my email validation")
        email.setCustomValidity("");
    }
}


function checkEmail(emailToCheck) {
    return /^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/m.test(emailToCheck);
}



// interests option

// add eventlistener to every checkbox
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
        if(checkbox.checked) {
            //add to array if checked
            selectedInterests.push(checkbox.value);
        } else {
            // remove from the array if unchecked
            selectedInterests = selectedInterests.filter((interest) => {
                return interest !== checkbox.value;
            })
        }

        sessionStorage.setItem("interests", JSON.stringify(selectedInterests));
        updateDisplayInterests();
    })
})


function updateDisplayInterests() {
    let selectedInterestsString = selectedInterests.length > 0 ? `${selectedInterests.join(", ")}.` : "None"; 
    displayInterests.textContent = selectedInterestsString;
}