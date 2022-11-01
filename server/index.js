const express = require('express');
const databaseConfig = require('./config/database');
const routesConfig = require('./config/routes');
const cors = require('./middlewares/cors');

start();

async function start() {
    const app = express();

    app.use(express.json());
    app.use(cors());

    await databaseConfig(app);
    routesConfig(app);

    app.listen(3030, () => console.log('REST service started'));
}