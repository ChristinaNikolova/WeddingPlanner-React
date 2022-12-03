const router = require('express').Router();
const { all } = require('../services/articles');
const { mapErrors } = require('../utils/parser');

router.get('/', async (req, res) => {
    try {
        const articles = await all();
        res.json(articles);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

module.exports = router;