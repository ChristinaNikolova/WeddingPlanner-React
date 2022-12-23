const router = require('express').Router();
const { all, create } = require('../services/guests');
const { mapErrors } = require('../utils/parser');

router.get('/:id', async (req, res) => {
    try {
        const plannerId = req.params.id;
        const guests = await all(plannerId);
        res.json(guests);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

router.post('/:id', async (req, res) => {
    try {
        const plannerId = req.params.id;
        const guest = await create(req.body.firstName, req.body.lastName, req.body.gender, req.body.age, req.body.side, req.body.role, req.body.table, req.body.mainDish, req.body.confirmed, plannerId);
        res.json(guest);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

module.exports = router;