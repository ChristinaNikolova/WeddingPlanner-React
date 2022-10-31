const { Schema, model } = require('mongoose');

const plannerSchema = new Schema({
    title: {
        type: String,
        default: '',
    },
    description: {
        type: String,
    },
    date: {
        type: String,
    },
    budget: {
        tupe: Number,
    },
    location: {
        type: String,
    },
    creator: {

    },
    // brideName: {
    //     type: String,
    // },
    // groomName: {
    //     type: String,
    // },
});

const Planner = model('Planner', plannerSchema);

module.exports = Planner;