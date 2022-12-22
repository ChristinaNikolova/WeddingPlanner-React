const { allByUserId, create, getById, deleteById } = require('../services/planners');
const router = require('express').Router();
const { mapErrors } = require('../utils/parser');

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

router.post('/', async (req, res) => {
    try {
        const userId = req.user._id;
        const planner = await create(req.body.description, req.body.date, req.body.budget, req.body.location, req.body.bride, req.body.groom, userId);
        res.json(planner);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const planner = await getById(id);
        res.json(planner);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const planner = await deleteById(id);
        res.json(planner);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

module.exports = router;