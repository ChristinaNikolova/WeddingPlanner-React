const baseUrl = 'http://localhost:3030';

const api = {
    register: `${baseUrl}/auth/register`,
    login: `${baseUrl}/auth/login`,
    logout: `${baseUrl}/auth/logout`,
    adminArticle: `${baseUrl}/admin/articles`,
    adminCategory: `${baseUrl}/admin/categories`,
    articles: `${baseUrl}/articles`,
    categories: `${baseUrl}/categories`,
}

module.exports = {
    api,
}