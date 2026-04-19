const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Razorpay = require('razorpay');
const Booking = require('../models/Booking');
const PricingRule = require('../models/PricingRule');

// Initialize Razorpay (Fallback to dummy if not set)
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'dummy_key',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret'
});

const DEFAULT_PACKAGES = {
  Standard: { price: 499, duration: '15 min', features: ['1 Race Session', 'Helmet & Gear', 'Timing Display'] },
  Premium: { price: 699, duration: '30 min', features: ['2 Race Sessions', 'Helmet & Gear', 'Timing Display', 'Photo Package'] },
  VIP: { price: 899, duration: '60 min', features: ['Unlimited Sessions', 'Premium Gear', 'Live Timing App', 'Photo & Video Package', 'Refreshments'] }
};

// GET Booking Page
router.get('/', async (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const rule = await PricingRule.findOne({ date: today });
  
  // Create a localized copy so we don't mutate the global defaults
  const currentPackages = JSON.parse(JSON.stringify(DEFAULT_PACKAGES));
  
  if (rule) {
    currentPackages.Standard.price = rule.standardPrice;
    currentPackages.Premium.price = rule.premiumPrice;
    currentPackages.VIP.price = rule.vipPrice;
  }

  // Convert object to array for EJS compatibility cleanly
  const packagesArr = Object.keys(currentPackages).map(k => ({ name: k, ...currentPackages[k] }));
  
  res.render('booking', {
    title: 'Book Your Race — Velocity Karting',
    packages: packagesArr,
    razorpayKey: process.env.RAZORPAY_KEY_ID
  });
});

// API: Get prices for a specific date
router.get('/api/price-for-date', async (req, res) => {
  try {
    const { date } = req.query; // YYYY-MM-DD
    const rule = await PricingRule.findOne({ date });
    
    if (rule) {
      return res.json({
        Standard: rule.standardPrice,
        Premium: rule.premiumPrice,
        VIP: rule.vipPrice
      });
    }
    
    // Default pricing
    res.json({
      Standard: DEFAULT_PACKAGES.Standard.price,
      Premium: DEFAULT_PACKAGES.Premium.price,
      VIP: DEFAULT_PACKAGES.VIP.price
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching prices' });
  }
});

// Create Razorpay Order & Pending Booking
router.post('/create-order', async (req, res) => {
  try {
    const { name, email, phone, date, timeSlot, numRacers, packageType, currency } = req.body;
    
    // Server-side price calculation based on date
    const rule = await PricingRule.findOne({ date });
    let pricePerPerson = DEFAULT_PACKAGES[packageType].price;
    if (rule) {
      if (packageType === 'Standard') pricePerPerson = rule.standardPrice;
      if (packageType === 'Premium') pricePerPerson = rule.premiumPrice;
      if (packageType === 'VIP') pricePerPerson = rule.vipPrice;
    }
    
    const totalPrice = pricePerPerson * Number(numRacers);
    
    // Create preliminary booking
    const booking = new Booking({
      name, email, phone, date, timeSlot, numRacers: Number(numRacers), 
      packageType, totalPrice, currency: currency || 'INR', paymentStatus: 'Pending'
    });
    
    await booking.save();
    
    // Create Razorpay order
    const options = {
      amount: Math.round(totalPrice * 100), // Ensure integer (paise)
      currency: 'INR',
      receipt: booking._id.toString()
    };
    
    let order_id = null;
    
    // Check if we have real/test keys (not placeholders)
    const hasRealKeys = process.env.RAZORPAY_KEY_ID && 
                       !process.env.RAZORPAY_KEY_ID.includes('YOUR_') && 
                       process.env.RAZORPAY_KEY_ID !== 'dummy_key';

    if (hasRealKeys) {
      try {
        console.log(`[Razorpay] Creating order for amount: ${options.amount}`);
        const order = await razorpay.orders.create(options);
        order_id = order.id;
        console.log(`[Razorpay] Order created successfully: ${order_id}`);
      } catch (rzpErr) {
        console.error('[Razorpay] Order creation failed:', rzpErr);
        // If real keys failed, we shouldn't continue with a dummy ID unless explicitly in dummy mode
        throw new Error('Razorpay service unavailable. Please try again later.');
      }
    } else {
      // Dummy mode
      order_id = "order_dummy_" + Math.random().toString(36).substr(2, 9);
      console.log(`[Razorpay] Dummy mode active. Generated ID: ${order_id}`);
    }
    
    // Update booking with Order ID
    booking.razorpayOrderId = order_id;
    await booking.save();
    
    res.json({
      success: true,
      order_id: order_id,
      amount: options.amount,
      currency: options.currency,
      booking_id: booking._id
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to initiate payment.' });
  }
});

// Verify Payment Callback
router.post('/verify-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, booking_id, is_dummy } = req.body;
    
    // Check if we are running in dummy mode
    if (is_dummy && (process.env.RAZORPAY_KEY_ID.startsWith('YOUR') || process.env.RAZORPAY_KEY_ID === 'dummy_key')) {
      const receiptId = 'VK-' + crypto.randomBytes(4).toString('hex').toUpperCase();
      await Booking.findByIdAndUpdate(booking_id, {
        paymentStatus: 'Completed',
        razorpayPaymentId: razorpay_payment_id,
        receiptId
      });
      return res.json({ success: true, receiptId });
    }
    
    const secret = process.env.RAZORPAY_KEY_SECRET || 'dummy_secret';
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body.toString())
      .digest('hex');
      
    if (expectedSignature === razorpay_signature) {
      // Payment Successful
      const receiptId = 'VK-' + crypto.randomBytes(4).toString('hex').toUpperCase();
      
      await Booking.findByIdAndUpdate(booking_id, {
        paymentStatus: 'Completed',
        razorpayPaymentId: razorpay_payment_id,
        receiptId
      });
      
      res.json({ success: true, receiptId });
    } else {
      // Payment Verification Failed
      await Booking.findByIdAndUpdate(booking_id, { paymentStatus: 'Failed' });
      res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// View Receipt
router.get('/receipt/:id', async (req, res) => {
  try {
    const booking = await Booking.findOne({ receiptId: req.params.id });
    if (!booking) return res.status(404).render('404', { title: 'Receipt Not Found' });
    
    res.render('receipt', { title: 'Booking Receipt', booking });
  } catch (err) {
    res.status(500).send('Error retrieving receipt');
  }
});

module.exports = router;
