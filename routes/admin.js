const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Feedback = require('../models/Feedback');
const PricingRule = require('../models/PricingRule');

// Middleware to check if admin is logged in
const isAuthenticated = (req, res, next) => {
  if (req.session.adminLoggedIn) {
    return next();
  }
  res.redirect('/admin/login');
};

// Login GET
router.get('/login', (req, res) => {
  if (req.session.adminLoggedIn) return res.redirect('/admin/dashboard');
  res.render('admin/login', { title: 'Admin Login — Velocity Karting', error: null });
});

// Login POST
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    req.session.adminLoggedIn = true;
    res.redirect('/admin/dashboard');
  } else {
    res.render('admin/login', { title: 'Admin Login', error: 'Invalid username or password' });
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
});

// Dashboard
router.get('/dashboard', isAuthenticated, async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const totalFeedback = await Feedback.countDocuments();
    
    const recentBookings = await Booking.find().sort({ createdAt: -1 }).limit(5);
    
    // Calculate total revenue (only completed ones if Razorpay is fully integrated)
    const completedBookings = await Booking.find({ paymentStatus: { $in: ['Completed', 'Pending'] } }); // Considering all pending as well for now
    const totalRevenue = completedBookings.reduce((sum, b) => sum + b.totalPrice, 0);

    res.render('admin/dashboard', { 
      title: 'Admin Dashboard', 
      totalBookings, 
      totalFeedback, 
      totalRevenue,
      recentBookings
    });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Bookings
router.get('/bookings', isAuthenticated, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.render('admin/bookings', { title: 'Manage Bookings', bookings });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Feedback
router.get('/feedback', isAuthenticated, async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.render('admin/feedback', { title: 'User Feedback', feedbacks });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Pricing Rules List
router.get('/pricing', isAuthenticated, async (req, res) => {
  try {
    const rules = await PricingRule.find().sort({ date: 1 });
    res.render('admin/pricing', { title: 'Dynamic Pricing', rules, error: null, success: null });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Add Pricing Rule
router.post('/pricing', isAuthenticated, async (req, res) => {
  try {
    const { date, standardPrice, premiumPrice, vipPrice } = req.body;
    
    // Check if rule already exists for date
    let rule = await PricingRule.findOne({ date });
    if (rule) {
      rule.standardPrice = standardPrice;
      rule.premiumPrice = premiumPrice;
      rule.vipPrice = vipPrice;
      await rule.save();
    } else {
      rule = new PricingRule({ date, standardPrice, premiumPrice, vipPrice });
      await rule.save();
    }
    
    const rules = await PricingRule.find().sort({ date: 1 });
    res.render('admin/pricing', { title: 'Dynamic Pricing', rules, error: null, success: 'Pricing rule saved successfully!' });
  } catch (error) {
    const rules = await PricingRule.find().sort({ date: 1 });
    res.render('admin/pricing', { title: 'Dynamic Pricing', rules, error: 'Error saving rule', success: null });
  }
});

// Delete Pricing Rule
router.post('/pricing/delete/:id', isAuthenticated, async (req, res) => {
  try {
    await PricingRule.findByIdAndDelete(req.params.id);
    res.redirect('/admin/pricing');
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
