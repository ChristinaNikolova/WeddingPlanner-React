import { api } from "./api";
import { requester } from "./requester";
import { httpMethods } from "../utils/constants/global";

export const getFav = () => {
  return requester(`${api.users}/articles`, httpMethods.GET)
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
