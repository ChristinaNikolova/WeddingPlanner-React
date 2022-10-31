const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        //TODO: Validate email,
    },
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        minlength: [1, 'First name should be at least 1 character long'],
        maxlength: [30, 'First name should be maximal 30 character long'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        minlength: [1, 'Last name should be at least 1 character long'],
        maxlength: [30, 'Last name should be maximal 30 character long'],
    },
    hashedPassword: {
        type: String,
        required: true,
    },
});

userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2,
    }
});

const User = model('User', userSchema);

module.exports = User;