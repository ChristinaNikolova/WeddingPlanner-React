const { Schema, model, Types: { ObjectId } } = require('mongoose');

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name should be at least 3 characters long'],
        maxlength: [30, 'Name should be maximal 30 characters long'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
    },
    costs: {
        type: [ObjectId],
        ref: 'Cost',
        default: [],
    },
});

categorySchema.index({ name: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2,
    }
});

const Category = model('Category', categorySchema);

module.exports = Category;