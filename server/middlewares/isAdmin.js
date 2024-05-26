const User = require('../models/user');
require('dotenv').config()

const isAdmin = async (req, res, next) => {
    console.log(req.user.isAdmin);
    if (!req.user.isAdmin) {
        return res.status(403).send({ message: 'Unauthorized access' })
    }
    res.status(200).send({ message: 'Admin Dashboard' })
}

module.exports = isAdmin