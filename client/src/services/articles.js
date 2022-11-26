import { api } from './api';
import { requester } from './requester';

export const create = (title, content, image, category) => {
    return requester(api.createArticle, 'POST', { title, content, image, category })
        .then((res) => res.json())
        .catch((err) => console.error(err));
}