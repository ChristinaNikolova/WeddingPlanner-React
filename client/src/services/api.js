const baseUrl = 'http://localhost:3030';

const api = {
    register: `${baseUrl}/auth/register`,
    login: `${baseUrl}/auth/login`,
}

module.exports = {
    api,
}