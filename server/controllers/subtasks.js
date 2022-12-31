const router = require('express').Router();
const { mapErrors } = require('../utils/parser');
const { create } = require('../services/subtasks');

router.post('/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const subtask = await create(taskId, req.body.description);
        res.json(subtask);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

module.exports = router;