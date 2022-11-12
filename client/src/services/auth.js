import { api } from './api';
import { requester } from './requester';

export const register = (firstName, lastName, email, password) => {
    return fetch(api.register, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password })
    })
        .then((res) => res.json())
        .catch((err) => console.error(err));
}

export const login = (email, password) => {
    return fetch(api.login, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
        .then((res) => res.json())
        .catch((err) => console.error(err));
}

export const logout = () => {
    return requester(api.logout, 'GET')
        .catch((err) => console.error(err));
}

export const getToken = () => {
    return sessionStorage.getItem('authToken');
}