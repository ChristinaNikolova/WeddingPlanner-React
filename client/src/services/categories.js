import { api } from './api';
import { requester } from './requester';

export const create = (name, image) => {
    return requester(api.adminCategory, 'POST', { name, image })
        .then((res) => res.json())
        .catch((err) => console.error(err));
}

export const update = (id, name, image) => {
    return requester(`${api.adminCategory}/${id}`, 'PUT', { name, image })
        .then((res) => res.json())
        .catch((err) => console.error(err));
}

export const deleteById = (id) => {
    return requester(`${api.adminCategory}/${id}`, 'DELETE')
        .then((res) => {
            if (res.status !== 204) {
                return res.json();
            }
        })
        .catch((err) => console.error(err));
}

export const all = () => {
    return requester(api.categories, 'GET')
        .then((res) => res.json())
        .catch((err) => console.error(err));
}

export const getById = (id) => {
    return requester(`${api.adminCategory}/${id}`, 'GET')
        .then((res) => res.json())
        .catch((err) => console.error(err));
}
