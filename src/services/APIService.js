import axios from 'axios';
const API_URL = 'http://localhost:8080';


export class APIService{

    constructor(){
    }

    getPhotographers() {
        const url = `${API_URL}/photographers`;
        return axios.get(url).then(response => response.data);
    }

    getPhotographerById(id) {
        const url = `${API_URL}/photographers/${id}`;
        return axios.get(url).then(response => response.data);
    }

    getPhotographerByUsername(username) {
        const url = `${API_URL}/photographers/u/${username}`;
        return axios.get(url).then(response => response.data);
    }

    editPhotographerByUsername(username, user) {
        const url = `${API_URL}/photographers/${username}`;
        return axios.patch(url, {
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age,
            gender: user.gender,
            region: user.region,
            city: user.city,
            phoneNumber: user.phoneNumber,
            eyesColor: user.eyesColor,
            hairColor: user.hairColor,
        }).then(response => response.data);
    }

    getModels() {
        const url = `${API_URL}/models`;
        return axios.get(url).then(response => response.data);
    }

    getModelById(id) {
        const url = `${API_URL}/models/${id}`;
        return axios.get(url).then(response => response.data);
    }

    getModelByUsername(username) {
        const url = `${API_URL}/models/u/${username}`;
        return axios.get(url).then(response => response.data);
    }

    editModelByUsername(username, user) {
        const url = `${API_URL}/models/${username}`;
        return axios.patch(url, {
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age,
            gender: user.gender,
            region: user.region,
            city: user.city,
            phoneNumber: user.phoneNumber,
            eyesColor: user.eyesColor,
            hairColor: user.hairColor,
        }).then(response => response.data);
    }

    changePassword(user) {
        const url = `${API_URL}/auth/password`;
        return axios.patch(url, {
            username: user.username,
            password: user.password
        }).then(response => response.data);
    }

    getPortfoliosByUser(username) {
        const url = `${API_URL}/portfolios/u/${username}`;
        return axios.get(url).then(response => response.data);
    }

    getCommentsByRatedUser(username) {
        const url = `${API_URL}/comments/rated/${username}`;
        return axios.get(url).then(response => response.data);
    }

    getComments() {
        const url = `${API_URL}/comments`;
        return axios.get(url).then(response => response.data);
    }

    addComment(comment) {
        const url = `${API_URL}/comments`;
        return axios.post(url, {
            ratingUserUsername: comment.ratingUserUsername,
            ratedUserUsername: comment.ratedUserUsername,
            rating: comment.rating,
            content: comment.content,
        }).then(response => response.data);
    }

    deleteComment(id) {
        const url = `${API_URL}/comments/delete/${id}`;
        return axios.delete(url).then(response => response.data);
    }

    addPhotoshoot(photoshoot) {
        const url = `${API_URL}/photoshoots`;
        return axios.post(url, {
            invitingUserUsername: photoshoot.invitingUserUsername,
            invitedUserUsername: photoshoot.invitedUserUsername,
            city: photoshoot.city,
            street: photoshoot.street,
            houseNumber: photoshoot.houseNumber,
            topic: photoshoot.topic,
            notes: photoshoot.notes,
            meetingDate: photoshoot.meetingDate,
            duration: photoshoot.duration,
        }).then(response => response.data);
    }

    acceptPhotoshoot(id) {
        const url = `${API_URL}/photoshoots/accept/${id}`;
        return axios.patch(url).then(response => response.data);
    }

    cancelPhotoshoot(id) {
        const url = `${API_URL}/photoshoots/cancel/${id}`;
        return axios.patch(url).then(response => response.data);
    }

    getAllByInvitingUserUsername(username) {
        const url = `${API_URL}/photoshoots/inviting/${username}`;
        return axios.get(url).then(response => response.data);
    }

    getAllByInvitedUserUsername(username) {
        const url = `${API_URL}/photoshoots/invited/${username}`;
        return axios.get(url).then(response => response.data);
    }

    getAllUsers() {
        const url = `${API_URL}/users`;
        return axios.get(url).then(response => response.data);
    }

    deleteUser(username) {
        const url = `${API_URL}/users/delete/${username}`;
        return axios.delete(url).then(response => response.data);
    }
}
