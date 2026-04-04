const express = require('express');
const router = express.Router();

// Currency converter proxy — avoids CORS issues on the frontend
router.get('/rates/:base', async (req, res) => {
  try {
    const base = req.params.base.toUpperCase();
    const response = await fetch(`https://open.er-api.com/v6/latest/${base}`);
    const data = await response.json();
    if (data.result === 'success') {
      res.json({ success: true, base: data.base_code, rates: data.rates });
    } else {
      res.status(400).json({ success: false, message: 'Failed to fetch rates' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
