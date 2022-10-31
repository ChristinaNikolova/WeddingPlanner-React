const express = require('express');
const mongoose = require('mongoose');

// const cors = require('./middlewares/cors');
// const authController = require('./controllers/authController');
// const dataController = require('./controllers/dataController');
// const trimBody = require('./middlewares/trimBody');
// const session = require('./middlewares/session');

const connectionString = 'mongodb://localhost:27017/weddingplanner';

start();

async function start() {
    await mongoose.connect(connectionString);
    console.log('Database connected');

    const app = express();

    app.get('/', (req, res) => {
        res.json({ message: 'REST service operational' });
    });

    app.listen(3030, () => console.log('REST service started'));
}