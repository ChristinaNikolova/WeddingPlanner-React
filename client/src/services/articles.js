import { api } from './api';
import { requester } from './requester';
import { httpMethods } from '../utils/constants/global';

export const create = (title, content, image, jumboImage, category) => {
    return requester(api.adminArticle, httpMethods.POST, { title, content, image, jumboImage, category })
        .then((res) => res.json())
        .catch((err) => console.error(err));
}

export const update = (id, title, content, image, jumboImage, category) => {
    return requester(`${api.adminArticle}/${id}`, httpMethods.PUT, { title, content, image, jumboImage, category })
        .then((res) => res.json())
        .catch((err) => console.error(err));
}

export const deleteById = (id) => {
    return requester(`${api.adminArticle}/${id}`, httpMethods.DELETE)
        .then((res) => res.json())
        .catch((err) => console.error(err));
}

export const all = (currentPage = 1, selectedCategory, query = '') => {
    return fetch(`${api.articles}/${currentPage}/${selectedCategory}/${query}`, {
        method: httpMethods.GET,
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .catch((err) => console.error(err));
}

export const getById = (id) => {
    return requester(`${api.articles}/${id}`, httpMethods.GET)
        .then((res) => res.json())
        .catch((err) => console.error(err));
}

export const like = (id) => {
    return requester(`${api.articles}/${id}`, httpMethods.POST)
        .then((res) => res.json())
        .catch((err) => console.error(err));
}

export const getLastThree = () => {
    return fetch(`${api.articles}`, {
        method: httpMethods.GET,
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .catch((err) => console.error(err));
}