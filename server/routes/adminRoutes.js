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
router.patch('/product/:id', isAuth, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, stock, image } = req.body;

        if (!name || !description || !price || !category || !stock || !image) {
            return res.status(400).json({ message: 'All fields must be present' });
        }

        if (isNaN(price) || isNaN(stock)) {
            return res.status(400).json({ message: 'Price and stock must be numeric values' });
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, { name, description, price, category, stock, image }, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });

    } catch (error) {
        console.error('Error while updating product:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


// delete a product
router.delete('/product/:id', isAuth, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json({ message: 'Product deleted successfully' });

    } catch (error) {
        console.error('Error while deleting product:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router