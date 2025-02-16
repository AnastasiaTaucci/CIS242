"use strict";

window.addEventListener("load", DeviceInfo);

//device data
let deviceData = [
    {label: "Language", value: navigator.language},
    {label: "Browser and platform", value: navigator.userAgent},
    {label: "Online Status", value: navigator.onLine ? "You’re online and ready to go!" : "Oops, it looks like you’re offline."},
    {label: "Total Screen Resolution", value: `Your screen rocks a resolution of ${screen.width} x  ${screen.height} pixels.`},
    {label: "Available Screen Resoultion", value: `There’s ${screen.availWidth} x ${screen.availHeight} pixels of screen space available for use.`},
];

// callback function to show device data
function DeviceInfo() {
    let infoDisplayed = document.querySelector("ul.device-info");

    deviceData.forEach((currentItem) => {
        let infoDisplayedItem = document.createElement("li");
        infoDisplayedItem.innerHTML = "<strong>" + currentItem.label + "</strong>: " + currentItem.value;
        infoDisplayed.appendChild(infoDisplayedItem);
    })

    try {
        if (!navigator.geolocation) throw "<strong>Location: </strong> Your browser doesn’t support geolocation. Maybe try another one?";

        function success(pos) {
            let locationItem = document.createElement("li");
            locationItem.innerHTML = "<strong>Location: </strong> You’re at Latitude  " + pos.coords.latitude + ", Longtitude " + pos.coords.longitude + ". Pretty cool, huh?";
            infoDisplayed.appendChild(locationItem);
        }

        function restricted(err) {
            let locationRestricted = document.createElement("li");
            locationRestricted.innerHTML = "<strong>Location: </strong> Sorry, we couldn’t access your location. Privacy first, right?";
            infoDisplayed.appendChild(locationRestricted);
        }

        navigator.geolocation.getCurrentPosition(success, restricted);


    } catch(error) {
        let locationNotSupported = document.createElement("li");
        locationNotSupported.innerHTML = error;
        infoDisplayed.appendChild(locationNotSupported);
    }
}
