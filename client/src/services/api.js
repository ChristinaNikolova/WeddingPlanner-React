const baseUrl = 'http://localhost:3030';

const api = {
    register: `${baseUrl}/auth/register`,
    login: `${baseUrl}/auth/login`,
    logout: `${baseUrl}/auth/logout`,
}

module.exports = {
    api,
}