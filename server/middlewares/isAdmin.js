const User = require('../models/user');
require('dotenv').config()

const isAdmin = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).send({ message: 'Unauthorized access' })
    }
    next()
}

module.exports = isAdmin

// check whether the user has admin credentials or not