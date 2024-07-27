// routes/index.js

const express = require('express');
const router = express.Router();

// Import routes
const authRoutes = require('./authRoutes.js');
const productRoutes = require('./productRoutes');
const feedbackRoutes = require('./feedbackRoutes');
const userRoutes = require( './userRoutes')

// Use routes
router.use('/api/auth', authRoutes);
router.use('/api/products', productRoutes);
router.use('/api/feedbacks', feedbackRoutes);
router.user('/api/users' , userRoutes)
module.exports = router;