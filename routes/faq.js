const express = require('express');
const router = express.Router();

const faqs = [
  { q: 'What age do you need to be to race?', a: 'We welcome racers from age 8 and up. Children aged 8-12 use our Junior karts with reduced speeds, while anyone 13 and older can drive our standard adult karts. Valid ID or parental consent is required for minors.' },
  { q: 'Do I need to bring my own helmet?', a: 'No! We provide DOT-certified full-face helmets in all sizes, along with a complimentary balaclava for hygiene. You\'re welcome to bring your own helmet if it meets our safety standards.' },
  { q: 'How fast do the go-karts go?', a: 'Our Standard karts reach up to 45 km/h, Premium karts hit 55 km/h, and our VIP Pro karts can reach a thrilling 70 km/h on the main straight. Speeds are adjusted for wet conditions and junior sessions.' },
  { q: 'Can I book for a group or corporate event?', a: 'Absolutely! We offer custom packages for groups of 10 to 100+ people. Corporate events include exclusive track hire, timing competitions, podium ceremonies, and optional catering. Contact us for a tailored quote.' },
  { q: 'What should I wear?', a: 'Wear comfortable clothing and closed-toe shoes — sneakers or boots work best. Avoid loose scarves, necklaces, or dangling accessories. We provide race suits and helmets. Long hair should be tied back.' },
  { q: 'Is go-karting safe?', a: 'Yes! Our karts feature roll cages, 5-point harnesses, side bumpers, and remote speed limiters. All sessions are supervised by trained marshals, and our tracks have extensive run-off zones and tire barriers. We maintain a perfect safety record.' },
  { q: 'How do I book a session?', a: 'You can book directly through our website using the Book Now page. Select your date, time slot, number of racers, and package type. Payment is processed securely online, and you\'ll receive instant confirmation via email.' },
  { q: 'What is your cancellation policy?', a: 'You may cancel or reschedule free of charge up to 24 hours before your session. Cancellations within 24 hours incur a 50% fee. No-shows are charged in full. Weather-related cancellations are fully refundable.' },
  { q: 'Do you have food and drinks?', a: 'Our Pit Stop Cafe offers a range of snacks, hot meals, and beverages including energy drinks, coffee, and smoothies. VIP package holders enjoy complimentary refreshments in the exclusive lounge area.' },
  { q: 'Can beginners race?', a: 'Absolutely! Most of our visitors are first-timers. Every session begins with a comprehensive safety briefing and driving tips from our instructors. Our Standard karts are designed to be forgiving and easy to control for newcomers.' },
  { q: 'Do you offer gift cards?', a: 'Yes! Digital gift cards are available in any denomination and can be purchased from our website. They make the perfect gift for birthdays, holidays, or just because. Gift cards are valid for 12 months from purchase.' },
  { q: 'Is there a weight or height limit?', a: 'For safety, the minimum height is 140 cm for adult karts and 120 cm for junior karts. The maximum weight limit is 120 kg. If you have concerns, please contact us before booking.' }
];

router.get('/', (req, res) => {
  res.render('faq', { title: 'FAQ — Velocity Karts', faqs });
});

module.exports = router;
