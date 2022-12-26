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

async function create(plannerId, title, startTime, endTime, duration) {
    const event = new Event({
        title,
        startTime,
        endTime,
        duration,
    });

    const result = await event.save();

    const planner = await Planner.findById(plannerId);
    planner.events.push(result._id);
    await planner.save();

    return result;
}

module.exports = {
    all,
    create,
}