const Planner = require("../models/Planner");
const Task = require("../models/Task");
const { taskViewModel } = require("../utils/mapper/task");

async function all(plannerId) {
    const planner = await Planner
        .findById(plannerId)
        .populate('tasks');

    return planner.tasks.
        sort((a, b) => b.createdAt - a.createdAt)
        .map(taskViewModel);
}

async function create(plannerId, title, description, timespan) {
    const task = new Task({
        title,
        description,
        timespan,
    });

    const result = await task.save();

    const planner = await Planner.findById(plannerId);
    planner.tasks.push(result._id);
    await planner.save();

    return result;
}


module.exports = {
    all,
    create,
}