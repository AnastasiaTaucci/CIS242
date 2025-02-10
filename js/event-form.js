let form = document.getElementById('event-form');
let feedback = document.getElementById("form-feedback");
let checkboxes = document.querySelectorAll("fieldset input[type='checkbox']");
let displayInterests = document.getElementById("display-interest");

let selectedInterests = [];


let email = document.getElementById('email');
email.addEventListener('invalid', (e) => {
    validateEmail();
})


form.addEventListener('submit', (e) => {
    e.preventDefault();  

    validateEmail();
    
    let nameElement = document.getElementById("first-name");
    let eventElement = document.getElementById("event");

    const name = nameElement.value;
    const eventSelection = eventElement.options[eventElement.selectedIndex].text;

    feedback.textContent = `Thank you, ${name}! You have successfully registered for the ${eventSelection} event.`;
});


// validate email

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