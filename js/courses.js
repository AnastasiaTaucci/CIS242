"use strict";

const courseList = document.getElementById("course-list");

// fetch disk golf courses for a given country
function fetchCourses(countryCode) {
    const url = "https://discgolfmetrix.com/api.php";

    fetch(`${url}?content=courses_list&country_code=${countryCode}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => displayCourses(data.courses))
    .catch(error => {
        console.log("Error: ", error);
        courseList.textContent = "Unable to load courses."; 
    })
}

function displayCourses(courses) {
    courseList.innerHTML = "";          //clear previous results

    courses.forEach(course => {
        if (course.City && course.Area) {
            let courseUL = document.createElement("ul");
            let courseName = document.createElement("li");
            let courseArea = document.createElement("li");
            let courseCity = document.createElement("li");
            courseName.innerHTML = `<strong>Course Name:</strong> ${course.Fullname}`;
            courseArea.innerHTML = `<strong>Area:</strong> ${course.Area}`;
            courseCity.innerHTML = `<strong>City:</strong> ${course.City}`;
            courseUL.appendChild(courseName);
            courseUL.appendChild(courseArea);
            courseUL.appendChild(courseCity);
            courseList.appendChild(courseUL);
        }
    })
}

document.getElementById("load-courses").addEventListener("click", () => {
    let selectedCountry = document.getElementById("country").value;
    fetchCourses(selectedCountry);
});