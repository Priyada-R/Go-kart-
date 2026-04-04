const mongoose = require('mongoose');

const pricingRuleSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true }, // Format: YYYY-MM-DD
  standardPrice: { type: Number, required: true },
  premiumPrice: { type: Number, required: true },
  vipPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PricingRule', pricingRuleSchema);
