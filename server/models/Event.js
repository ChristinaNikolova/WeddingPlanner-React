const { Schema, model } = require('mongoose');
const { event } = require('../utils/constants/model');

const eventSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [event.TITLE_MIN_LEN, `Title should be at least ${event.TITLE_MIN_LEN} characters long`],
        maxlength: [event.TITLE_MAX_LEN, `Title should be maximal ${event.TITLE_MAX_LEN} characters long`],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
    },
    description: {
        type: String,
        maxlength: [event.DESC_MAX_LEN, `Description should be maximal ${event.DESC_MAX_LEN} characters long`],
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
        maxlength: [event.ADDRESS_MAX_LEN, `Address should be maximal ${event.ADDRESS_MAX_LEN} characters long`],
        default: '',
    },
    isHighlighted: {
        type: Boolean,
        default: false,
    },
});

const Event = model('Event', eventSchema);

module.exports = Event;