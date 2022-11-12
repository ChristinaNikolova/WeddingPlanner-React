import { getToken } from "./auth";

export const requester = (url, method, data) => {
    console.log(getToken());
    return fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': `Bearer ${getToken()}`
        },
        body: data ? JSON.stringify(data) : null
    });
};