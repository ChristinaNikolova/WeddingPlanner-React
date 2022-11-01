const router = require('express').Router();
const { register } = require('../services/auth');

router.post('/register', async (req, res) => {
    try {
        const token = await register(req.body.firstName, req.body.lastName, req.body.email, req.body.password);
        res.json(token);
    } catch (error) {
    }
});

module.exports = router;