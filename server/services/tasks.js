const Planner = require("../models/Planner");
const { taskViewModel } = require("../utils/mapper/task");

async function all(plannerId) {
    //todo test sorting!!!
    const planner = await Planner
        .findById(plannerId)
        .populate('tasks');

    return planner.tasks.
        sort((a, b) => b.createdAt - a.createdAt)
        .map(taskViewModel);
}

module.exports = {
    all,
}