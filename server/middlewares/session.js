const { parseToken } = require("../services/auth");

module.exports = () => async (req, res, next) => {
    const token = (req.headers['x-authorization'])?.split(' ')[1];

    if (token) {
        try {
            const payload = await parseToken(token);
            req.user = payload;
            req.token = token;
        } catch (err) {
            return res.status(401).json({ message: 'Invalid authorization token' });
        }
    }

    next();
};