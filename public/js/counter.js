// Live Character Counter for textarea
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const textareas = document.querySelectorAll('[data-char-limit]');

    textareas.forEach(textarea => {
      const maxLength = parseInt(textarea.getAttribute('data-char-limit'), 10);
      const counterId = textarea.getAttribute('data-counter');
      const counter = document.getElementById(counterId);

      if (!counter || !maxLength) return;

      textarea.setAttribute('maxlength', maxLength);

      function updateCounter() {
        const current = textarea.value.length;
        const remaining = maxLength - current;
        counter.textContent = `${current} / ${maxLength}`;

        // Remove all states
        counter.classList.remove('warning', 'danger');

        // Apply state colors
        if (remaining <= 0) {
          counter.classList.add('danger');
        } else if (remaining <= Math.floor(maxLength * 0.2)) {
          counter.classList.add('warning');
        }
      }

      textarea.addEventListener('input', updateCounter);
      textarea.addEventListener('paste', () => setTimeout(updateCounter, 0));

      // Initialize
      updateCounter();
    });
  });
})();
