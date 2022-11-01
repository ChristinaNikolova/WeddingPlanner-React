const express = require('express');
const cors = require('../middlewares/cors');
const session = require('../middlewares/session');

module.exports = (app) => {
    app.use(express.json());
    app.use(cors());
    //TODO trimBody
    app.use(session());
}