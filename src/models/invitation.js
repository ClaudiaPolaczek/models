export default class Invitation {
    constructor(invitingUserUsername, invitedUserUsername, city, street, houseNumber,
                topic, notes, meetingDate, duration) {
        this.invitingUserUsername = invitingUserUsername;
        this.invitedUserUsername = invitedUserUsername;
        this.city = city;
        this.street = street;
        this.houseNumber = houseNumber;
        this.topic = topic;
        this.notes = notes;
        this.meetingDate = meetingDate;
        this.duration = duration;
    }
}
