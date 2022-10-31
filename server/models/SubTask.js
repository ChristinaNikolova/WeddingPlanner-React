const { Schema, model } = require('mongoose');

const subTaskSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [5, 'Title should be at least 5 characters long'],
        maxlength: [50, 'Title should be maximal 50 characters long'],
    },
    isDone: {
        type: Boolean,
        default: false,
    },
});

const SubTask = model('SubTask', subTaskSchema);

module.exports = SubTask;