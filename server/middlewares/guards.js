const { mapErrors } = require("../utils/parser");

function isAdmin() {
    return (req, res, next) => {
        if (req.user && req.user.email === 'admin@weddingplanner.com') {
            next();
        } else {
            const message = mapErrors({ message: 'Please log in' });
            res.status(401).json({ message });
        }
    }
}

function hasUser() {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.status(401).json({ message: 'Please log in' });
        }
    };
}

function isGuest() {
    return (req, res, next) => {
        if (req.user) {
            res.status(400).json({ message: 'You are already logged in' });
        } else {
            next();
        }
    };
}

module.exports = {
    isAdmin,
    hasUser,
    isGuest,
}