const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

router.get('/', (req, res) => {
  res.render('booking', {
    title: 'Book Your Race — Velocity Karts',
    packages: [
      { name: 'Standard', price: 2000, duration: '15 min', features: ['1 Race Session', 'Helmet & Gear', 'Timing Display'] },
      { name: 'Premium', price: 3500, duration: '30 min', features: ['2 Race Sessions', 'Helmet & Gear', 'Timing Display', 'Photo Package'] },
      { name: 'VIP', price: 6000, duration: '60 min', features: ['Unlimited Sessions', 'Premium Gear', 'Live Timing App', 'Photo & Video Package', 'Refreshments'] }
    ]
  });
});

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, date, timeSlot, numRacers, packageType, totalPrice, currency } = req.body;
    const booking = new Booking({ name, email, phone, date, timeSlot, numRacers: Number(numRacers), packageType, totalPrice: Number(totalPrice), currency: currency || 'INR' });
    await booking.save();
    res.json({ success: true, message: 'Booking confirmed! See you at the track! 🏁', booking });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
