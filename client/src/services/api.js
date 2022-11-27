const baseUrl = 'http://localhost:3030';

//todo refactor and use one 
const api = {
    register: `${baseUrl}/auth/register`,
    login: `${baseUrl}/auth/login`,
    logout: `${baseUrl}/auth/logout`,
    createArticle: `${baseUrl}/admin/articles`,
    adminCategory: `${baseUrl}/admin/categories`,
    categories: `${baseUrl}/categories`,
}

module.exports = {
    api,
}