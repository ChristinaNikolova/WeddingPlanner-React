import { api } from "./api";
import { requester } from "./requester";

export const all = (plannerId) => {
    return requester(`${api.notes}/${plannerId}`, 'GET')
        .then((res) => res.json())
        .catch((err) => console.error(err));
}

export const create = (plannerId, description) => {
    return requester(`${api.notes}/${plannerId}`, 'POST', { description })
        .then((res) => res.json())
        .catch((err) => console.error(err));
}

export const deleteById = (id) => {
    return requester(`${api.notes}/${id}`, 'DELETE')
        .then((res) => res.json())
        .catch((err) => console.error(err));
}