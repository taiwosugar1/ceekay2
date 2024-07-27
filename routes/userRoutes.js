// routes/usersRoutes.js

const express = require('express');
const router = express.Router();
const { getUsers, getUser, updateUser } = require('../controllers/userController');
const { protect, admin } = require('../middlewares/authMiddleware');

// Get all users (Admin only)
router.get('/', protect, admin, getUsers);

// Get a single user by ID (Admin only)
router.get('/:id', protect, admin, getUser);

// Update a user by ID (Admin only)
router.put('/:id', protect, admin, updateUser);

router.post('/', protect, admin);

module.exports = router;