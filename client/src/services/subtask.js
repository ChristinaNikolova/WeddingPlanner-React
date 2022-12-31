import { httpMethods } from "../utils/constants/global";
import { api } from "./api";
import { requester } from "./requester";

export const create = (taskId, description) => {
    return requester(`${api.subtask}/${taskId}`, httpMethods.POST, { description })
        .then((res) => res.json())
        .catch((err) => console.error(err));
}