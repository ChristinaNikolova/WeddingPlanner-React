const router = require('express').Router();
const { all } = require('../services/events');
const { mapErrors } = require('../utils/parser');

router.get('/:id', async (req, res) => {
    try {
        const plannerId = req.params.id;
        const events = await all(plannerId);
        res.json(events);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

module.exports = router;