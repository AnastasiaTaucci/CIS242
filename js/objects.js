"use strict";

// constructor for Event
function Event(name, date, location) {
    this.name = name;
    this.date = date;
    this.location = location;
    this.participants = [];
}

// method to register the prticipant
Event.prototype.registerParticipant = function(participantName) {
    if (participantName) {
        this.participants.push(participantName);
        return `${participantName} has been registered for ${this.name}. Please see the event details below: `;
    } else {
        return "Invalid participant name"
    }
}

// method to get event details
Event.prototype.getDetails = function() {
    return `📅 Event: ${this.name} <br>
    📍 Location: ${this.location} <br>
    🗓 Date: ${this.date} <br>
    👥 Participants: ${this.participants.length}`;
}