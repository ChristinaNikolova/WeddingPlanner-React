const { Schema, model } = require('mongoose');

const noteSchema = new Schema({
    description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [5, 'Description should be at least 5 characters long'],
        maxlength: [100, 'Description should be maximal 100 characters long'],
    },
});

const Note = model('Note', noteSchema);

module.exports = Note;