const Note = require("../models/Note");
const Planner = require("../models/Planner");
const { noteViewModel } = require("../utils/mapper/note");

async function all(plannerId) {
    const planner = await Planner
        .findById(plannerId)
        .populate('notes');

    //todo sort notes
    return planner.notes.map(noteViewModel);
}

async function create(plannerId, description) {
    const note = new Note({
        description,
    });

    const result = await note.save();

    const planner = await Planner.findById(plannerId);
    planner.notes.push(result._id);
    await planner.save();

    return result;
}

module.exports = {
    all,
    create,
}