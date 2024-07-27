// routes/feedbackRoutes.js

const express = require('express');
const router = express.Router();
const { getFeedbacks, submitFeedback } = require('../controllers/feedbackContoller');

// Get all feedbacks
router.get('/', getFeedbacks);

// Submit feedback
router.post('/', submitFeedback);

module.exports = router;