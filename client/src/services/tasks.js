import { httpMethods } from "../utils/constants/global";
import { api } from "./api";
import { requester } from "./requester";

export const all = (plannerId) => {
    return requester(`${api.tasks}/${plannerId}`, httpMethods.GET)
        .then((res) => res.json())
        .catch((err) => console.error(err));
}

export const create = (plannerId, title, description, timespan) => {
    return requester(`${api.tasks}/${plannerId}`, httpMethods.POST, { title, description, timespan })
        .then((res) => res.json())
        .catch((err) => console.error(err));
}

export const deleteById = (id) => {
    return requester(`${api.tasks}/${id}`, httpMethods.DELETE)
        .then((res) => res.json())
        .catch((err) => console.error(err));
}

export const getById = (plannerId, taskId) => {
    return requester(`${api.tasks}/${plannerId}/${taskId}`, httpMethods.GET)
        .then((res) => res.json())
        .catch((err) => console.error(err));
}

export const update = (id, title, description) => {
    return requester(`${api.tasks}/${id}`, httpMethods.PUT, { title, description })
        .then((res) => res.json())
        .catch((err) => console.error(err));
}