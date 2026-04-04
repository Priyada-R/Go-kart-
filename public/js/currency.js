// Currency Converter — fetches real-time exchange rates
(function () {
  let cachedRates = {};
  let baseCurrency = 'INR';

  document.addEventListener('DOMContentLoaded', () => {
    const currencySelect = document.getElementById('currency-select');
    const convertedDisplay = document.getElementById('converted-price');

    if (!currencySelect) return;

    currencySelect.addEventListener('change', async () => {
      const targetCurrency = currencySelect.value;
      if (targetCurrency === baseCurrency) {
        updateDisplay(1);
        return;
      }

      convertedDisplay.innerHTML = '<span class="currency-loader"></span>';

      try {
        if (!cachedRates[baseCurrency]) {
          const res = await fetch(`/api/rates/${baseCurrency}`);
          const data = await res.json();
          if (data.success) {
            cachedRates[baseCurrency] = data.rates;
          } else {
            throw new Error('Failed to fetch rates');
          }
        }

        const rate = cachedRates[baseCurrency][targetCurrency];
        if (rate) {
          updateDisplay(rate, targetCurrency);
        }
      } catch (err) {
        convertedDisplay.textContent = 'Unable to fetch rates. Try again.';
        console.error('Currency fetch error:', err);
      }
    });
  });

  function updateDisplay(rate, currency) {
    const totalEl = document.getElementById('booking-total');
    const convertedDisplay = document.getElementById('converted-price');
    if (!totalEl || !convertedDisplay) return;

    const totalINR = parseFloat(totalEl.getAttribute('data-total') || 0);
    const converted = (totalINR * rate).toFixed(2);

    if (currency && currency !== 'INR') {
      convertedDisplay.textContent = `≈ ${converted} ${currency}`;
    } else {
      convertedDisplay.textContent = '';
    }
  }

  // Expose for booking page price updates
  window.currencyConverter = { updateDisplay, clearCache: () => { cachedRates = {}; } };
})();
