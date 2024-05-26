const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const isAuth = require('../middlewares/isAuth')
const isAdmin = require('../middlewares/isAdmin')
require('dotenv').config()

// admin dashboard
router.get('/dashboard', isAuth, isAdmin, (req, res) => {
    try {
        res.send('admin dashboard')
    } catch (error) {
        console.error(error);
    }
})

// create new product
router.post('/product', isAuth, isAdmin, (req, res) => {
    try {

    } catch (error) {
        console.error(error);
    }
})

// update a product
router.patch('/product/:id', isAuth, isAdmin, (req, res) => {
    try {

    } catch (error) {
        console.error(error);
    }
})

// delete a product
router.delete('/product/:id', isAuth, isAdmin, (req, res) => {
    try {

    } catch (error) {
        console.error(error);
    }
})

module.exports = router