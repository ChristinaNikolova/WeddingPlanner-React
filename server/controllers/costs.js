const router = require('express').Router();
const { all, create } = require('../services/costs');
const { mapErrors } = require('../utils/parser');

router.get('/:id', async (req, res) => {
    try {
        const plannerId = req.params.id;
        const costs = await all(plannerId);
        res.json(costs);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

router.post('/:id', async (req, res) => {
    try {
        const plannerId = req.params.id;
        const cost = await create(plannerId, req.body.title, req.body.price, req.body.category);
        res.json(cost);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

module.exports = router;