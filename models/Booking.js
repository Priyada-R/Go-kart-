const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  numRacers: { type: Number, required: true, min: 1, max: 20 },
  packageType: {
    type: String,
    required: true,
    enum: ['Standard', 'Premium', 'VIP']
  },
  totalPrice: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
