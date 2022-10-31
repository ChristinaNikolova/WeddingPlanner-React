const { Schema, model } = require('mongoose');

const costSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [3, 'Title should be at least 3 characters long'],
        maxlength: [30, 'Title should be maximal 30 characters long'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    description: {
        type: String,
        maxlength: [100, 'Description should be maximal 100 characters long'],
    },
});

const Cost = model('Cost', costSchema);

module.exports = Cost;