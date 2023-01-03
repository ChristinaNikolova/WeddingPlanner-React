const homeController = require('../controllers/home');
const authController = require('../controllers/auth');
const articlesController = require('../controllers/articles');
const categoriesController = require('../controllers/categories');
const usersController = require('../controllers/users');
const plannersController = require('../controllers/planners');
const guestsController = require('../controllers/guests');
const costsController = require('../controllers/costs');
const notesController = require('../controllers/notes');
const eventsController = require('../controllers/events');
const tasksController = require('../controllers/tasks');
const subtasksController = require('../controllers/subtasks');
const adminArticlesController = require('../controllers/admin/articles');
const adminCategoriesController = require('../controllers/admin/categories');
const { hasUser } = require('../middlewares/guards');

module.exports = (app) => {
    app.use(homeController);
    app.use('/auth', authController);
    app.use('/articles', articlesController);
    app.use('/categories', categoriesController);
    app.use('/users', hasUser(), usersController);
    app.use('/planners', hasUser(), plannersController);
    app.use('/guests', hasUser(), guestsController);
    app.use('/costs', hasUser(), costsController);
    app.use('/notes', hasUser(), notesController);
    app.use('/events', hasUser(), eventsController);
    app.use('/tasks', hasUser(), tasksController);
    app.use('/subtasks', hasUser(), subtasksController);
    app.use('/admin/articles', adminArticlesController);
    app.use('/admin/categories', adminCategoriesController);
}