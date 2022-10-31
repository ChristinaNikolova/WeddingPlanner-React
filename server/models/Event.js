const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
    },
    startTime: {
        type: Date,
        required: [true, 'Start time is required'],
    },
    duration: {
        type: String,
    },
    address: {
        type: String,
    },
    isHighlighted: {
        type: Boolean,
        default: false,
    },
});

const Event = model('Event', eventSchema);

module.exports = Event;