import { api } from './api';

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

export const getToken = () => {
    return sessionStorage.getItem('accessToken');
}