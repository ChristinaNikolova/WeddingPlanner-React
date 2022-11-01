const { Schema, model } = require('mongoose');
const { guest } = require('../utils/constants/model');

const guestSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        minlength: [guest.NAME_MIN_LEN, `First name should be at least ${guest.NAME_MIN_LEN} character long`],
        maxlength: [guest.NAME_MAX_LEN, `First name should be maximal ${guest.NAME_MAX_LEN} character long`],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        minlength: [guest.NAME_MIN_LEN, `Last name should be at least ${guest.NAME_MIN_LEN} character long`],
        maxlength: [guest.NAME_MAX_LEN, `Last name should be maximal ${guest.NAME_MAX_LEN} character long`],
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
        enum: ['male', 'female'],
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
        enum: [
            'bride',
            'groom',
            'best man',
            'maid of honor',
            'bridesmaid',
            'groomsman',
            'parent',
            'sister',
            'brother',
            'family member',
            'friend'
        ],
    },
    table: {
        type: Number,
        default: 0,
    },
    mainDish: {
        type: String,
        enum: ['no info', 'meat', 'fish', 'veggie'],
        default: 'no info',
    },
    comment: {
        type: String,
        maxlength: [guest.COMMENT_MAX_LEN, `Comment should be maximal ${guest.COMMENT_MAX_LEN} characters long`],
        default: '',
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
});

const Guest = model('Guest', guestSchema);

module.exports = Guest;