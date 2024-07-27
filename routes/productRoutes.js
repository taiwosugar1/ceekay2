// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect, admin } = require('../middlewares/authMiddleware');

// Create a product (Admin only)
router.post('/', protect, admin, createProduct);

// Get all products
router.get('/', getProducts);

// Get a single product by ID
router.get('/:id', getProduct);

// Update a product (Admin only)
router.put('/:id', protect, admin, updateProduct);

// Delete a product (Admin only)
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;