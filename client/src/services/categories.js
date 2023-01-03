import { api } from './api';
import { requester } from './requester';
import { httpMethods } from '../utils/constants/global';

export const create = (name, image) => {
    return requester(api.adminCategory, httpMethods.POST, { name, image })
        .then((res) => res.json())
        .catch((err) => console.error(err));
}

export const update = (id, name, image) => {
    return requester(`${api.adminCategory}/${id}`, httpMethods.PUT, { name, image })
        .then((res) => res.json())
        .catch((err) => console.error(err));
}

export const deleteById = (id) => {
    return requester(`${api.adminCategory}/${id}`, httpMethods.DELETE)
        .then((res) => {
            if (res.status !== 204) {
                return res.json();
            }
        })
        .catch((err) => console.error(err));
}

export const all = () => {
    return fetch(api.categories, {
        method: httpMethods.GET,
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .catch((err) => console.error(err));
}

export const getById = (id) => {
    return requester(`${api.adminCategory}/${id}`, httpMethods.GET)
        .then((res) => res.json())
        .catch((err) => console.error(err));
}
