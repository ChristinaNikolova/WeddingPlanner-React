const { Schema, model } = require('mongoose');

const subTaskSchema = new Schema({
});

const SubTask = model('SubTask', subTaskSchema);

module.exports = SubTask;