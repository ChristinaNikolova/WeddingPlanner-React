const { Schema, model } = require('mongoose');

const guestSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
        emum: ['male', 'female'],
    },
    age: {
        type: String,
        required: [true, 'Age is required'],
        enum: ['adult', 'child', 'baby'],
    },
    side: {
        type: String,
        required: [true, 'Side is required'],
        enum: ['bride', 'groom'],
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        enum: ['bride', 'groom', 'best man', 'maid of honor', 'bridesmaid', 'groomsman', 'parent', 'sister', 'brother', 'family member', 'friend'],
    },
    table: {
        type: Number,
        default: 0,
    },
    mainDish: {
        type: String,
        enum: ['meat', 'fish', 'veggie'],
    },
    comment: {
        type: String,
        default: '',
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
});

const Guest = model('Guest', guestSchema);

module.exports = Guest;