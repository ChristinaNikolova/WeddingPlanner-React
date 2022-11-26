const homeController = require('../controllers/home');
const authController = require('../controllers/auth');
const adminArticlesController = require('../controllers/admin/articles');
const adminCategoriesController = require('../controllers/admin/categories');

module.exports = (app) => {
    app.use(homeController);
    app.use('/auth', authController);
    app.use('/admin/articles', adminArticlesController);
    app.use('/admin/categories', adminCategoriesController);
}