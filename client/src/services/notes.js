import { api } from "./api";
import { requester } from "./requester";

export const all = (plannerId) => {
    return requester(`${api.notes}/${plannerId}`, 'GET')
        .then((res) => res.json())
        .catch((err) => console.error(err));
}