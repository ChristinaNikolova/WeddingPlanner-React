import { api } from './api';
import { requester } from './requester';

export const getFav = () => {
    return requester(`${api.users}/articles`, 'GET')
        .then((res) => res.json())
        .catch((err) => console.error(err));
}