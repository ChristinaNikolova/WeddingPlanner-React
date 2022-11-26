const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { isAdmin } = require('../../middlewares/guards');
const { create } = require('../../services/articles');
const { mapErrors } = require('../../utils/parser');

router.post('/create', isAdmin(),
    body('image').isURL().withMessage('Invalid url'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                throw mapErrors(errors);
            }

            const article = await create(req.body.title, req.body.content, req.body.image, '63821b8fb2a4c8a3c80eda01');
            res.json(article);
        } catch (error) {
            const message = mapErrors(error);
            res.status(400).json({ message });
        }
    });

module.exports = router;