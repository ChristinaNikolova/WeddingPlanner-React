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

module.exports = {
    isAdmin,
}