const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const isAuth = require('../middlewares/isAuth')
const isAdmin = require('../middlewares/isAdmin')
require('dotenv').config()

// Register a new user 
router.post('/register', async (req, res) => {
    try {
        const { email, password, isAdmin } = req.body
        const user = await User.findOne({ email });
        if (user) {
            res.status(409).json({ message: 'User already exists' })
        }
        const newUser = new User({
            email,
            password,
            isAdmin
        })

        // Password hashing 
        const salt = bcrypt.genSaltSync(10);
        newUser.password = bcrypt.hashSync(newUser.password, salt)


        await newUser.save()

        return res.status(201).send({ message: 'New user created successfully', user: newUser })

    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error while registering user' })
    }
})


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email });
        if (!email || !password) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }
        if (!user) {
            return res.status(400).json({ message: 'User not found, kindly register' })
        }

        const checkPassword = bcrypt.compareSync(password, user.password);
        if (!checkPassword) {
            return res.status(400).json({ message: 'Incorrect password' })
        }

        const token = user.generateAuthToken()
        res.setHeader('Authorization', `Bearer ${token}`); //Set Authorization token in Header
        return res.status(200).json({ message: 'User logged in successfully', token })

    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error while logging in user' })
    }
})


router.get('/protected', isAuth, (req, res) => {
    res.send('Protected Routes')
})

router.get('/admin', isAuth, isAdmin, (req, res) => {
    res.send('Admin Routes')
})

module.exports = router