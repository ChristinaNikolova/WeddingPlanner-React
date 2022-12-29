const router = require('express').Router();
const { mapErrors } = require('../utils/parser');
const { all, create } = require('../services/tasks');

router.get('/:id', async (req, res) => {
    try {
        const plannerId = req.params.id;
        const tasks = await all(plannerId);
        res.json(tasks);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

router.post('/:id', async (req, res) => {
    try {
        const plannerId = req.params.id;
        const task = await create(plannerId, req.body.title, req.body.description);
        res.json(task);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

module.exports = router;