const Subtask = require("../models/Subtask");
const Task = require("../models/Task");

async function create(taskId, description) {
    const subtask = new Subtask({
        description,
    });

    const result = await subtask.save();

    const task = await Task.findById(taskId);
    task.subtasks.push(result._id);
    await task.save();

    return result;
}

module.exports = {
    create,
}