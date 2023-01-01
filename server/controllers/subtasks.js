const router = require('express').Router();
const { mapErrors } = require('../utils/parser');
const { create, done, deleteById, update, getById } = require('../services/subtasks');

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

router.post('/:taskId/:subtaskId', async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const subtaskId = req.params.subtaskId;

        const subtask = await done(taskId, subtaskId);
        res.json(subtask);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

router.delete('/:taskId/:subtaskId', async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const subtaskId = req.params.subtaskId;

        const subtask = await deleteById(taskId, subtaskId);
        res.json(subtask);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const subtask = await update(id, req.body.description);
        res.json(subtask);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const subtask = await getById(id, true);
        res.json(subtask);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});


module.exports = router;