// routes/auth.js

const express = require('express');
const { userLogin, adminLogin, register } = require('../controllers/authController');
const router = express.Router();

// User registration
router.post('/register', register);

// User login
router.post('/login', userLogin);

// Admin login
router.post('/admin/login', adminLogin);
module.exports = router;
