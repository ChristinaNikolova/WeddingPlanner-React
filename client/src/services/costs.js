import { httpMethods } from "../utils/constants/global";
import { api } from "./api";
import { requester } from "./requester";

export const all = (plannerId) => {
    return requester(`${api.costs}/${plannerId}`, httpMethods.GET)
        .then((res) => res.json())
        .catch((err) => console.error(err));
}

export const create = (plannerId, title, price, category) => {
    return requester(`${api.costs}/${plannerId}`, httpMethods.POST, { title, price, category })
        .then((res) => res.json())
        .catch((err) => console.error(err));
}

export const deleteById = (id) => {
    return requester(`${api.costs}/${id}`, httpMethods.DELETE)
        .then((res) => res.json())
        .catch((err) => console.error(err));
}