const Note = require("../models/Note");
const Planner = require("../models/Planner");
const { noteViewModel } = require("../utils/mapper/note");

async function all(plannerId) {
    const planner = await Planner
        .findById(plannerId)
        .populate('notes');

    return planner.notes.
        sort((a, b) => b.createdAt - a.createdAt)
        .map(noteViewModel);
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

async function deleteById(id) {
    return Note.findByIdAndDelete(id);
}

module.exports = {
    all,
    create,
    deleteById,
}