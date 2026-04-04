// FAQ Accordion — toggle answers on question click
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all others
        faqItems.forEach(other => {
          if (other !== item) other.classList.remove('open');
        });

        // Toggle current
        item.classList.toggle('open', !isOpen);
      });
    });
  });
})();
