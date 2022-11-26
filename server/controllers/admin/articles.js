const router = require('express').Router();
const { isAdmin } = require('../../middlewares/guards');

router.post('/create', isAdmin(), async (req, res) => {
    console.log('controller');
});

module.exports = router;