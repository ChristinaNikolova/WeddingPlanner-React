const Event = require("../models/Event");
const Planner = require("../models/Planner");
const { eventViewModel } = require("../utils/mapper/event");

async function all(plannerId) {
    const planner = await Planner
        .findById(plannerId)
        .populate('events');

    //todo sort((a, b) => b.createdAt - a.createdAt)
    return planner.events
        .map(eventViewModel);
}

module.exports = {
    all,
}