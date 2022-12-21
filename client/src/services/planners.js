import { api } from "./api";
import { requester } from "./requester";

export const all = () => {
    return requester(`${api.planners}`, 'GET')
        .then((res) => res.json())
        .catch((err) => console.error(err));
}