const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

router.get('/', (req, res) => {
  res.render('feedback', { title: 'Share Your Experience — Velocity Karting' });
});

router.post('/', async (req, res) => {
  try {
    const { name, email, rating, message } = req.body;
    const feedback = new Feedback({ name, email, rating: Number(rating), message });
    await feedback.save();
    res.json({ success: true, message: 'Thank you for your feedback! 🙏' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
