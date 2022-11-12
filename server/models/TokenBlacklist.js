const { Schema, model } = require('mongoose');

const tokenBlacklistSchema = new Schema({
    tokens: {
        type: [String],
        default: [],
    },
});

const TokenBlacklist = model('TokenBlacklist', tokenBlacklistSchema);

module.exports = TokenBlacklist;