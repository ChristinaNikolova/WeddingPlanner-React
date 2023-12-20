import { api } from "./api";
import { requester } from "./requester";
import { httpMethods } from "../utils/constants/global";

export const all = (plannerId) => {
  return requester(`${api.notes}/${plannerId}`, httpMethods.GET)
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const create = (plannerId, description) => {
  return requester(`${api.notes}/${plannerId}`, httpMethods.POST, {
    description,
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const deleteById = (id) => {
  return requester(`${api.notes}/${id}`, httpMethods.DELETE)
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const getById = (plannerId, noteId) => {
  return requester(`${api.notes}/${plannerId}/${noteId}`, httpMethods.GET)
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const update = (id, description) => {
  return requester(`${api.notes}/${id}`, httpMethods.PUT, { description })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
