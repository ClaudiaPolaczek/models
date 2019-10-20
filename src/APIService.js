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

    getModels() {
        const url = `${API_URL}/models`;
        return axios.get(url).then(response => response.data);
    }

    getModelById(id) {
        const url = `${API_URL}/models/${id}`;
        return axios.get(url).then(response => response.data);
    }

    getPortfoliosByUser(username) {
        const url = `${API_URL}/portfolios/u/${username}`;
        return axios.get(url).then(response => response.data);
    }

    getCommentsByRatedUser(username) {
        const url = `${API_URL}/comments/rated/${username}`;
        return axios.get(url).then(response => response.data);
    }

    getContact(pk) {
        const url = `${API_URL}/photographers/${pk}`;
        return axios.get(url).then(response => response.data);
    }
}
