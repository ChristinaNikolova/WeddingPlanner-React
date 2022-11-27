const router = require('express').Router();
const { isAdmin } = require('../../middlewares/guards');
const { create, deleteById, getById } = require('../../services/categories');
const { mapErrors } = require('../../utils/parser');
const { category } = require('../../utils/constants/global');

router.post('/', isAdmin(), async (req, res) => {
    try {
        const category = await create(req.body.name, req.body.image);
        res.json(category);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

router.delete('/:id', isAdmin(), async (req, res) => {
    try {
        const id = req.params.id;

        if (id === category.DEFAUL_CATEGORY_SELECTED_ID) {
            return;
        }

        await deleteById(id);
        res.status(204).end();
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

router.get('/:id', isAdmin(), async (req, res) => {
    try {
        const id = req.params.id;
        const category = await getById(id);
        res.json(category);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

module.exports = router;