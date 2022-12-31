const mongoose = require('mongoose');
require('../models/Article');
require('../models/Category');
require('../models/Comment');
require('../models/Cost');
require('../models/Event');
require('../models/Guest');
require('../models/Note');
require('../models/Planner');
require('../models/Subtask');
require('../models/Task');
require('../models/TokenBlacklist');
require('../models/User');

const connectionString = 'mongodb://localhost:27017/weddingplanner';

module.exports = async (app) => {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Database connected');

        mongoose.connection.on('error', (err) => {
            console.error('Database error');
            console.error(err);
        });
    } catch (err) {
        console.error('Error connecting to database');
        process.exit(1);
    }
}