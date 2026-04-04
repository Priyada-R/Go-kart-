const express = require('express');
const router = express.Router();

const galleryImages = [
  { src: '/images/gallery/track1.webp', category: 'track', caption: 'Main Circuit — Night Race' },
  { src: '/images/gallery/track2.webp', category: 'track', caption: 'Hairpin Curve Under Lights' },
  { src: '/images/gallery/track3.webp', category: 'track', caption: 'The Starting Grid' },
  { src: '/images/gallery/kart1.webp', category: 'karts', caption: 'Pro Series Kart' },
  { src: '/images/gallery/kart2.webp', category: 'karts', caption: 'Junior Kart Fleet' },
  { src: '/images/gallery/kart3.webp', category: 'karts', caption: 'VIP Custom Kart' },
  { src: '/images/gallery/racer1.webp', category: 'racers', caption: 'Podium Celebration' },
  { src: '/images/gallery/racer2.webp', category: 'racers', caption: 'Intense Overtake' },
  { src: '/images/gallery/racer3.webp', category: 'racers', caption: 'Team Photo' },
  { src: '/images/gallery/event1.webp', category: 'events', caption: 'Corporate Championship' },
  { src: '/images/gallery/event2.webp', category: 'events', caption: 'Birthday Party Fun' },
  { src: '/images/gallery/event3.webp', category: 'events', caption: 'Weekend Tournament' }
];

router.get('/', (req, res) => {
  res.render('gallery', { title: 'Gallery — Velocity Karts', images: galleryImages });
});

module.exports = router;
