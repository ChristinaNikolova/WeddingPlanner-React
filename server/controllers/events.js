const router = require('express').Router();
const { all, create } = require('../services/events');
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

router.post('/:id', async (req, res) => {
    try {
        const plannerId = req.params.id;
        const event = await create(plannerId, req.body.title, req.body.startTime, req.body.endTime, req.body.duration);
        res.json(event);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

module.exports = router;