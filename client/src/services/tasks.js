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