import { api } from "./api";
import { requester } from "./requester";
import { httpMethods } from "../utils/constants/global";

export const all = (plannerId) => {
  return requester(`${api.events}/${plannerId}`, httpMethods.GET)
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const create = (plannerId, title, startTime, endTime, duration) => {
  return requester(`${api.events}/${plannerId}`, httpMethods.POST, {
    title,
    startTime,
    endTime,
    duration,
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const heightlight = (plannerId, eventId) => {
  return requester(`${api.events}/${plannerId}/${eventId}`, httpMethods.POST)
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const deleteById = (id) => {
  return requester(`${api.events}/${id}`, httpMethods.DELETE)
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const getById = (plannerId, eventId) => {
  return requester(`${api.events}/${plannerId}/${eventId}`, httpMethods.GET)
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const update = (id, title, startTime, endTime, duration) => {
  return requester(`${api.events}/${id}`, httpMethods.PUT, {
    title,
    startTime,
    endTime,
    duration,
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
