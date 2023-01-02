const router = require('express').Router();
const { all } = require('../services/costs');
const { mapErrors } = require('../utils/parser');

router.get('/:id', async (req, res) => {
    try {
        const plannerId = req.params.id;
        const costs = await all(plannerId);

        //todo check result
        console.log(costs);

        res.json(costs);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

module.exports = router;