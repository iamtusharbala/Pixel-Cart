const jwt = require('jsonwebtoken')
const User = require('../models/user')
require('dotenv').config()

const isAuth = async (req, res, next) => {
    try {
        const authHeader = req.get('Authorization') //Get Authorization key from header
        if (!authHeader) {
            return res.status(400).send('Authorization header missing')
        }
        const token = authHeader.split(" ")[1]
        if (!token || token === "") {
            return res.send('No access')
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next()
    } catch (error) {
        console.error(error);
    }
}

module.exports = isAuth