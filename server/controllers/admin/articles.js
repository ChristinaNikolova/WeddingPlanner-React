const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { isAdmin } = require('../../middlewares/guards');
const { create, deleteById, update } = require('../../services/articles');
const { mapErrors } = require('../../utils/parser');

router.post('/', isAdmin(),
    body('image').isURL().withMessage('Invalid url'),
    body('jumboImage').isURL().withMessage('Invalid url'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                throw mapErrors(errors);
            }

            const article = await create(req.body.title, req.body.content, req.body.image, req.body.jumboImage, req.body.category);
            res.json(article);
        } catch (error) {
            const message = mapErrors(error);
            res.status(400).json({ message });
        }
    });

router.put('/:id', isAdmin(),
    body('image').isURL().withMessage('Invalid url'),
    body('jumboImage').isURL().withMessage('Invalid url'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                throw mapErrors(errors);
            }

            console.log(req.body.content);
            console.log(req.body.content.length)

            const id = req.params.id;
            const article = await update(id, req.body.title, req.body.content, req.body.image, req.body.jumboImage, req.body.category);
            res.json(article);
        } catch (error) {
            const message = mapErrors(error);
            res.status(400).json({ message });
        }
    });

router.delete('/:id', isAdmin(), async (req, res) => {
    try {
        const id = req.params.id;

        const article = await deleteById(id);
        res.json(article);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

module.exports = router;