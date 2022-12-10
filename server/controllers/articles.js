const router = require('express').Router();
const { all, getTotalCount } = require('../services/articles');
const { pagination } = require('../utils/constants/global');
const { mapErrors } = require('../utils/parser');

router.get('/:page/:category?', async (req, res) => {
    try {
        let currentPage = req.params.page;
        const selectedCategory = req.params.category || '';

        if (selectedCategory) {
            currentPage = 1;
        }

        const skip = (currentPage - 1) * pagination.ARTICLES_PER_PAGE;
        const totalArticles = await getTotalCount(selectedCategory);
        const pagesCount = Math.ceil(totalArticles / pagination.ARTICLES_PER_PAGE);

        const articles = await all(pagination.ARTICLES_PER_PAGE, skip, selectedCategory);
        console.log('articles');
        res.json({ articles, pagesCount, currentPage });
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

module.exports = router;