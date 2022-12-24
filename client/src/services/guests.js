import { api } from "./api";
import { requester } from "./requester";

export const all = (plannerId) => {
    return requester(`${api.guests}/${plannerId}`, 'GET')
        .then((res) => res.json())
        .catch((err) => console.error(err));
}

export const create = (plannerId, firstName, lastName, gender, age, side, role, table, mainDish, confirmed) => {
    return requester(`${api.guests}/${plannerId}`, 'POST', { firstName, lastName, gender, age, side, role, table, mainDish, confirmed })
        .then((res) => res.json())
        .catch((err) => console.error(err));
}

export const deleteById = (id) => {
    return requester(`${api.guests}/${id}`, 'DELETE')
        .then((res) => res.json())
        .catch((err) => console.error(err));
}

export const update = (id, firstName, lastName, gender, age, side, role, table, mainDish, confirmed) => {
    return requester(`${api.guests}/${id}`, 'PUT', { firstName, lastName, gender, age, side, role, table, mainDish, confirmed })
        .then((res) => res.json())
        .catch((err) => console.error(err));
}

export const getById = (plannerId, guestId) => {
    return requester(`${api.guests}/${plannerId}/${guestId}`, 'GET')
        .then((res) => res.json())
        .catch((err) => console.error(err));
}