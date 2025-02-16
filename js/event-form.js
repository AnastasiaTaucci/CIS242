"use strict";

let eventTableBody = document.getElementById("event-table-body");

let form = document.getElementById('event-form');
let feedback = document.getElementById("form-feedback");
let eventDropdown = document.getElementById("event");
let checkboxes = document.querySelectorAll("fieldset input[type='checkbox']");
let displayInterests = document.getElementById("display-interest");

let selectedInterests = [];

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

// populating dropdown for event selection
function populateDropdown() {
    events.forEach(event => {
        let option = document.createElement("option");
        option.value = event.name;
        option.textContent = event.name;
        eventDropdown.appendChild(option);
    })
}

window.addEventListener("load", populateDropdown);



// email validation 
let email = document.getElementById('email');
email.addEventListener('invalid', (e) => {
    validateEmail();
})




form.addEventListener('submit', (e) => {
    e.preventDefault();  

    validateEmail();
    
    let nameElement = document.getElementById("first-name");
    const name = nameElement.value.trim();
    

    let selectedEventName = eventDropdown.value;

    let selectedEvent = events.find(event => {
        return event.name === selectedEventName;
    })


    //register participants
    let registrationMessage = selectedEvent ? selectedEvent.registerParticipant(name) : "Event not found";
    
    feedback.innerHTML = `${registrationMessage} <br><br> ${selectedEvent.getDetails()}`;

    form.reset();
});




// validate email function

function validateEmail() {
    if (email.validity.valueMissing) {
        email.setCustomValidity("Enter your email");
    } else if (checkEmail(email.value) === false) {
        email.setCustomValidity("Enter a valid email");
    } else {
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

        updateDisplayInterests();
        console.log(selectedInterests);
    })
})


function updateDisplayInterests() {
    let selectedInterestsString = selectedInterests.length > 0 ? `${selectedInterests.join(", ")}.` : "None"; 
    displayInterests.textContent = selectedInterestsString;
    console.log(selectedInterestsString);
}