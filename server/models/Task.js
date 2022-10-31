const { Schema, model, Types: { ObjectId } } = require('mongoose');

const taskSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [5, 'Title should be at least 5 characters long'],
        maxlength: [50, 'Title should be maximal 50 characters long'],
    },
    description: {
        type: String,
        maxlength: [500, 'Description should be maximal 500 characters long'],
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
    planner: {
        type: ObjectId,
        ref: 'Planner',
        required: true,
    },
});

const Task = model('Task', taskSchema);

module.exports = Task;