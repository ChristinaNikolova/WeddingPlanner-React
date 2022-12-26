import { api } from "./api";
import { requester } from "./requester";
import { httpMethods } from "../utils/constants/global";

export const all = (plannerId) => {
    return requester(`${api.events}/${plannerId}`, httpMethods.GET)
        .then((res) => res.json())
        .catch((err) => console.error(err));
}

export const create = (plannerId, title, startTime, endTime, duration) => {
    return requester(`${api.events}/${plannerId}`, httpMethods.POST, { title, startTime, endTime, duration })
        .then((res) => res.json())
        .catch((err) => console.error(err));
}