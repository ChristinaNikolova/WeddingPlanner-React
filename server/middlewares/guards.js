function isAdmin() {
    return (req, res, next) => {
        if (req.user && req.user.email === 'admin@weddingplanner.com') {
            console.log('admin')
            next();
        } else {
            console.log('no admin')
            res.status(401).json([{ msg: 'Please log in' }]);
        }
    }
}

module.exports = {
    isAdmin,
}