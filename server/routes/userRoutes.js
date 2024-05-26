const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// Register a new user 
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email });
        if (user) {
            res.status(409).json({ message: 'User already exists' })
        }
        const newUser = new User({
            email,
            password
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
        const data = {
            token: token,
            isAdmin: user.isAdmin,
            _id: user._id
        }
        return res.status(200).json({ message: 'User logged in successfully', data })

    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error while logging in user' })
    }
})

module.exports = router