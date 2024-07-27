// controllers/feedbackController.js

const { Feedback } = require('../models/FeedbackModel');

exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.submitFeedback = async (req, res) => {
  const { name, message } = req.body;

  try {
    const feedback = new Feedback({ name, message });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add other feedback-related methods