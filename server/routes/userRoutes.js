const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const isAuth = require('../middlewares/isAuth')
const isAdmin = require('../middlewares/isAdmin')
const Product = require('../models/product')
require('dotenv').config()

// Get all products
router.get('/products', async (req, res) => {
    try {
        const allProducts = await Product.find();
        return res.status(200).send({ message: 'All Products fetched successfully', product: allProducts })
    } catch (error) {
        console.error(error);
    }
})


// Get one product
router.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).send({ message: 'Product fetched successfully', product })
    } catch (error) {
        console.error(error);
    }
})

// Register a new user 
router.post('/register', async (req, res) => {
    try {
        const { email, password, isAdmin } = req.body.data
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ message: 'User already exists' })
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
        const { email, password } = req.body.data
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
            userId: user._id
        }
        res.setHeader('Authorization', `Bearer ${token}`); //Set Authorization token in Header
        return res.status(200).json({ message: 'User logged in successfully', data })

    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error while logging in user' })
    }
})


// Update user details
router.patch('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email or password must be present' })
        }
        // Hash the new password before saving
        const hashedPassword = bcrypt.hashSync(password, 10);

        const updatedUser = await User.findByIdAndUpdate(id, { email, password: hashedPassword }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User updated successfully', user: updatedUser });

    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: 'Error while updating user' });
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: 'Error while deleting user' });
    }
});

module.exports = router