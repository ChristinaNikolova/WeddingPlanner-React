const { Schema, model } = require('mongoose');
const { subTask } = require('../utils/constants/model');

const subTaskSchema = new Schema({
    description: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [subTask.DESC_MIN_LEN, `Title should be at least ${subTask.DESC_MIN_LEN} characters long`],
        maxlength: [subTask.DESC_MAX_LEN, `Title should be maximal ${subTask.DESC_MAX_LEN} characters long`],
    },
    isDone: {
        type: Boolean,
        default: false,
    },
});

const SubTask = model('SubTask', subTaskSchema);

module.exports = SubTask;