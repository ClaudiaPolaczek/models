import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit }, user) {
            return AuthService.login(user).then(
                user => {
                    commit('loginSuccess', user);
                    return Promise.resolve(user);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error.response.data);
                }
            );
        },
        logout({ commit }) {
            AuthService.logout();
            commit('logout');
        },
        registerModel({ commit }, user) {
            return AuthService.registerModel(user).then(
                response => {
                    commit('registerSuccess');
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('registerFailure');
                    return Promise.reject(error.response.data);
                }
            );
        },
        registerPhotographer({ commit }, user) {
            return AuthService.registerPhotographer(user).then(
                response => {
                    commit('registerSuccess');
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('registerFailure');
                    return Promise.reject(error.response.data);
                }
            );
        }
    },
    mutations: {
        loginSuccess(state, user) {
            state.status = { loggedIn: true };
            state.user = user;
        },
        loginFailure(state) {
            state.status = {};
            state.user = null;
        },
        logout(state) {
            state.status = {};
            state.user = null;
        },
        registerSuccess(state) {
            state.status = {};
        },
        registerFailure(state) {
            state.status = {};
        }
    }
};
