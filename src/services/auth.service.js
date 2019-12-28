import axios from 'axios';
const API_URL = 'http://localhost:8080/auth/';


class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'signin', {
                username: user.username,
                password: user.password
            })
            .then(this.handleResponse)
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    registerModel(user) {
        return axios.post(API_URL + 'm/signup', {
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            birthdayYear: user.birthdayYear,
            gender: user.gender,
            region: user.region,
            city: user.city,
            phoneNumber: user.phoneNumber,
            hairColor: user.hairColor,
            eyesColor: user.eyesColor,
            regulationsAgreement : user.regulationsAgreement
        });
    }

    registerPhotographer(user) {
        return axios.post(API_URL + 'p/signup', {
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            birthdayYear: user.birthdayYear,
            gender: user.gender,
            region: user.region,
            city: user.city,
            phoneNumber: user.phoneNumber,
            regulationsAgreement : user.regulationsAgreement
        });
    }

    handleResponse(response) {
        if (response.status === 401) {
            this.logout();
            location.reload(true);

            const error = response.data && response.data.message;
            return Promise.reject(error);
        }

        return Promise.resolve(response);
    }
}

export default new AuthService();
