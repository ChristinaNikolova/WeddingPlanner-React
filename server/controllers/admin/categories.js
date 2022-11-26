const router = require('express').Router();
const { isAdmin } = require('../../middlewares/guards');
const { create } = require('../../services/categories');
const { mapErrors } = require('../../utils/parser');

router.post('/create', isAdmin(), async (req, res) => {
    try {
        const category = await create(req.body.name, req.body.image);
        res.json(category);
    } catch (error) {
        const message = mapErrors(error);
        res.status(401).json({ message });
    }
});

module.exports = router;