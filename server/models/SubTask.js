const { Schema, model } = require('mongoose');
const { subTask } = require('../utils/constants/model');

const subTaskSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [subTask.TITLE_MIN_LEN, `Title should be at least ${subTask.TITLE_MIN_LEN} characters long`],
        maxlength: [subTask.TITLE_MAX_LEN, `Title should be maximal ${subTask.TITLE_MAX_LEN} characters long`],
    },
    isDone: {
        type: Boolean,
        default: false,
    },
});

const SubTask = model('SubTask', subTaskSchema);

module.exports = SubTask;