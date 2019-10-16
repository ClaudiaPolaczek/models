import axios from 'axios';
const API_URL = 'http://localhost:8080';


export class APIService{

    constructor(){
    }

    getPhotographers() {
        const url = `${API_URL}/photographers`;
        return axios.get(url).then(response => response.data);
    }

    getContact(pk) {
        const url = `${API_URL}/photographers/${pk}`;
        return axios.get(url).then(response => response.data);
    }
}
