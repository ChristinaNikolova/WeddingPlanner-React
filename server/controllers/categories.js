const { all } = require('../services/categories');

const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const categories = await all();
        res.json(categories);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }

});

module.exports = router;