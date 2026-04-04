// Gallery — Category filtering + Lightbox
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');

    // Filtering
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');

        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter items with animation
        galleryItems.forEach(item => {
          const itemCategory = item.getAttribute('data-category');
          if (category === 'all' || itemCategory === category) {
            item.classList.remove('hidden');
            item.style.animation = 'fadeInUp 0.4s ease forwards';
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });

    // Lightbox
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        if (!lightbox) return;
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-caption');
        const lightboxImg = lightbox.querySelector('img');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');

        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        if (lightboxCaption && caption) lightboxCaption.textContent = caption.textContent;

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    // Close lightbox
    if (lightbox) {
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
          lightbox.classList.remove('active');
          document.body.style.overflow = '';
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
          lightbox.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }
  });
})();
