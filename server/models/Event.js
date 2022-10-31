const { Schema, model, Types: { ObjectId } } = require('mongoose');

const eventSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [5, 'Title should be at least 5 characters long'],
        maxlength: [50, 'Title should be maximal 50 characters long'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
    },
    description: {
        type: String,
        maxlength: [500, 'Description should be maximal 500 characters long'],
        default: '',
    },
    startTime: {
        type: Date,
        required: [true, 'Start time is required'],
    },
    endTime: {
        type: Date,
        required: [true, 'End time is required'],
    },
    duration: {
        type: String,
        default: '',
    },
    address: {
        type: String,
        maxlength: [100, 'Address should be maximal 100 characters long'],
        default: '',
    },
    isHighlighted: {
        type: Boolean,
        default: false,
    },
    planner: {
        type: ObjectId,
        ref: 'Planner',
        required: true,
    },
});

const Event = model('Event', eventSchema);

module.exports = Event;