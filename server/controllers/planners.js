const { allByUserId } = require('../services/planners');

const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const userId = req.user._id;
        const planners = await allByUserId(userId);
        res.json(planners);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

module.exports = router;