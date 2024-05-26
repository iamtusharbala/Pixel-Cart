const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

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

        return res.status(201).send({ message: 'New user created successfully' })

    } catch (error) {

    }
})

module.exports = router