const { Schema, model, Types: { ObjectId } } = require('mongoose');
const { task } = require('../utils/constants/model');

const taskSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [task.TITLE_MIN_LEN, `Title should be at least ${task.TITLE_MIN_LEN} characters long`],
        maxlength: [task.TITLE_MAX_LEN, `Title should be maximal ${task.TITLE_MAX_LEN} characters long`],
    },
    description: {
        type: String,
        maxlength: [task.DESC_MAX_LEN, `Description should be maximal ${task.DESC_MAX_LEN} characters long`],
        default: '',
    },
    timeSpan: {
        type: String,
        required: [true, 'Time span is required'],
        enum: [
            'one year',
            'nine months',
            'six months',
            'three months',
            'one month',
            'three weeks',
            'two weeks',
            'one week',
            'one day',
            'wedding day',
        ],
    },
    progress: {
        type: Number,
        default: 0,
    },
    subTasks: {
        type: [ObjectId],
        ref: 'SubTask',
        default: [],
    },
},
    {
        timestamps: true,
    },
);

const Task = model('Task', taskSchema);

module.exports = Task;