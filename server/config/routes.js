const home = require('../controllers/home');

module.exports = (app) => {
    app.use(home);
}