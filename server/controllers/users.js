const { getFavArticles } = require('../services/users');

const router = require('express').Router();

router.get('/articles', async (req, res) => {
    try {
        const userId = req.user._id;
        const articles = await getFavArticles(userId);
        res.json(articles);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

module.exports = router;