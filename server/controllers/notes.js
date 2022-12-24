const router = require('express').Router();
const { all, create } = require('../services/notes');
const { mapErrors } = require('../utils/parser');

router.get('/:id', async (req, res) => {
    try {
        const plannerId = req.params.id;
        const notes = await all(plannerId);
        res.json(notes);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

router.post('/:id', async (req, res) => {
    try {
        const plannerId = req.params.id;
        const note = await create(plannerId, req.body.description);
        res.json(note);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

module.exports = router;