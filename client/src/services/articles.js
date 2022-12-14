import { api } from './api';
import { requester } from './requester';

export const create = (title, content, image, jumboImage, category) => {
    return requester(api.createArticle, 'POST', { title, content, image, jumboImage, category })
        .then((res) => res.json())
        .catch((err) => console.error(err));
}

export const all = (currentPage = 1, selectedCategory, query = '') => {
    return requester(`${api.articles}/${currentPage}/${selectedCategory}/${query}`, 'GET')
        .then((res) => res.json())
        .catch((err) => console.error(err));
}

export const getById = (id) => {
    return requester(`${api.articles}/${id}`, 'GET')
        .then((res) => res.json())
        .catch((err) => console.error(err));
}

export const like = (id) => {
    return requester(`${api.articles}/${id}`, 'POST')
        .then((res) => res.json())
        .catch((err) => console.error(err));
}