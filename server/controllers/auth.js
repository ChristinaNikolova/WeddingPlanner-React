const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { register, login, logout } = require('../services/auth');
const { user } = require('../utils/constants/model');
const { mapErrors } = require('../utils/parser');

router.post('/register',
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: user.PASSWORD_MIN_LEN }).withMessage(`Password should be between ${user.PASSWORD_MIN_LEN} and ${user.PASSWORD_MAX_LEN} characters long`),
    body('password').isLength({ max: user.PASSWORD_MAX_LEN }).withMessage(`Password should be between ${user.PASSWORD_MIN_LEN} and ${user.PASSWORD_MAX_LEN} characters long`),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                throw mapErrors(errors);
            }

            const token = await register(req.body.firstName, req.body.lastName, req.body.email, req.body.password);
            res.json(token);
        } catch (error) {
            const message = mapErrors(error);
            res.status(400).json({ message });
        }
    });

router.post('/login', async (req, res) => {
    try {
        const token = await login(req.body.email, req.body.password);
        res.json(token);
    } catch (error) {
        const message = mapErrors(error);
        res.status(401).json({ message });
    }
});

router.post('/logout', async (req, res) => {
    try {
        const token = req.body.token;
        await logout(token);
        res.status(204).end();
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

module.exports = router;