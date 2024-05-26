const express = require('express')
const router = express.Router()
const User = require('../models/user')
const isAuth = require('../middlewares/isAuth')
const isAdmin = require('../middlewares/isAdmin')
const Product = require('../models/product')
require('dotenv').config()

// admin dashboard
router.get('/dashboard', isAuth, isAdmin, async (req, res) => {
    try {
        const allProducts = await Product.find();
        return res.status(200).send({ message: 'All Products fetched successfully', product: allProducts })
    } catch (error) {
        console.error(error);
    }
})

// create new product
router.post('/product', isAuth, isAdmin, async (req, res) => {
    try {
        const { name, description, price, category, stock, image } = req.body
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            stock,
            image
        })
        await newProduct.save()

        return res.status(201).send({ message: 'New Product created successfully', product: newProduct })
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