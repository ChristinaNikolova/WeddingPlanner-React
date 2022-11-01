const { hash, compare } = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User");

const secret = 'my-very-secret';
const tokenBlacklist = new Set();

async function register(firstName, lastName, email, password) {
    let user = await getUserByEmail(email);

    if (user) {
        throw new Error('Email is already taken');
    }

    const hashedPassword = await hash(password, 10);

    user = new User({
        firstName,
        lastName,
        email,
        hashedPassword,
    });

    await user.save();

    return createToken(user);
}

async function getUserByEmail(email) {
    return await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
}

function createToken(user) {
    const payload = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    };

    return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        accessToken: jwt.sign(payload, secret),
    };
}

function parseToken(token) {
    if (tokenBlacklist.has(token)) {
        throw new Error('Token is blacklisted');
    }

    return jwt.verify(token, secret);
}

module.exports = {
    register,
    parseToken,
}