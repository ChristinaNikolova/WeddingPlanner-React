const { Schema, model, Types: { ObjectId } } = require('mongoose');

const DATE_PATTERN = /^[0-9]{2}.[0-9]{2}.[0-9]{4}$/;

const plannerSchema = new Schema({
    title: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        maxlength: [500, 'Description should be maximal 500 characters long'],
        default: '',
    },
    date: {
        type: String,
        required: [true, 'Date is required'],
        match: [DATE_PATTERN, 'Date should be in format dd.mm.yyyy'],
    },
    budget: {
        type: Number,
        min: [0, 'Budget should be a positive number'],
    },
    location: {
        type: String,
        maxlength: [100, 'Location should be maximal 100 characters long'],
        default: '',
    },
    bride: {
        type: ObjectId,
        ref: 'Guest',
        required: true,
    },
    groom: {
        type: ObjectId,
        ref: 'Guest',
        required: true,
    },
    creator: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    notes: {
        type: [ObjectId],
        ref: 'Note',
        default: [],
    },
});

const Planner = model('Planner', plannerSchema);

module.exports = Planner;