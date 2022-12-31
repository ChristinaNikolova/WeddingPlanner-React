const Subtask = require("../models/Subtask");
const Task = require("../models/Task");

async function create(taskId, description) {
    const subtask = new Subtask({
        description,
    });

    const result = await subtask.save();

    const task = await Task.findById(taskId);
    task.subtasks.push(result._id);
    task.target++;
    await task.save();

    return result;
}

async function done(taskId, subtaskid) {
    const subtask = await Subtask.findById(subtaskid);
    subtask.isDone = !subtask.isDone;
    subtask.save();

    const task = await Task.findById(taskId);
    subtask.isDone ? task.progress++ : task.progress--;
    await task.save();

    return subtask;
}

module.exports = {
    create,
    done,
}