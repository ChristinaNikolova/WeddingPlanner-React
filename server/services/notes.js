const Note = require("../models/Note");
const Planner = require("../models/Planner");
const { noteViewModel } = require("../utils/mapper/note");

async function all(plannerId) {
    const planner = await Planner
        .findById(plannerId)
        .populate('notes');

    return planner.notes.map(noteViewModel);
}

module.exports = {
    all,
}