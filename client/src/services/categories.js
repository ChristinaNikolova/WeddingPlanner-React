import { api } from './api';
import { requester } from './requester';

export const create = (name, image) => {
    return requester(api.createCategory, 'POST', { name, image })
        .then((res) => res.json())
        .catch((err) => console.error(err));
}