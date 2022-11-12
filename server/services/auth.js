const { hash, compare } = require('bcrypt');
const jwt = require('jsonwebtoken');
const TokenBlacklist = require("../models/TokenBlacklist");
const User = require("../models/User");

const secret = 'my-very-secret';

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

async function login(email, password) {
    let user = await getUserByEmail(email);

    if (!user) {
        throw new Error('Incorrect email or password');
    }

    const match = await compare(password, user.hashedPassword);

    if (!match) {
        throw new Error('Incorrect email or password');
    }

    return createToken(user);
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
    //TODO check if works
    if (TokenBlacklist.find({}).some((t) => t.tokens === token)) {
        throw new Error('Token is blacklisted');
    }

    return jwt.verify(token, secret);
}

async function getUserByEmail(email) {
    return await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
}

module.exports = {
    register,
    login,
    parseToken,
}