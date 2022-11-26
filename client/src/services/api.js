const baseUrl = 'http://localhost:3030';

const api = {
    register: `${baseUrl}/auth/register`,
    login: `${baseUrl}/auth/login`,
    logout: `${baseUrl}/auth/logout`,
    createCategory: `${baseUrl}/admin/categories/create`
}

module.exports = {
    api,
}