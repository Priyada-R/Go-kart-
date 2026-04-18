const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Velocity Karting — Ultimate Go Karting Experience',
    features: [
      { icon: '⚡', title: 'Lightning Speed', desc: 'Our karts hit up to 70 km/h on professionally designed tracks built for adrenaline.' },
      { icon: '🛡️', title: 'Safety First', desc: 'Full-face helmets, roll cages, and 5-point harnesses — your safety is our obsession.' },
      { icon: '🏆', title: 'Competitive Racing', desc: 'Real-time lap tracking, leaderboards, and weekly tournaments for all skill levels.' },
      { icon: '🎉', title: 'Group Events', desc: 'Corporate outings, birthday parties, and team-building with custom packages and catering.' }
    ],
    testimonials: [
      { name: 'Arjun Mehta', role: 'Weekend Racer', quote: 'Velocity Karting is hands-down the best karting experience I\'ve ever had. The track design is insane!', avatar: 'AM' },
      { name: 'Priya Sharma', role: 'Corporate Event', quote: 'We booked a team event here and everyone loved it. The staff made everything seamless and fun.', avatar: 'PS' },
      { name: 'David Chen', role: 'Racing Enthusiast', quote: 'The karts are well-maintained, and the competitive timing system keeps me coming back every week.', avatar: 'DC' }
    ]
  });
});

router.get('/brochure', (req, res) => {
  res.render('brochure', {
    title: 'Velocity Karting — Brochure'
  });
});

module.exports = router;
