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