const express = require('express');
const router = express.Router();

const blogPosts = [
  {
    id: 'ultimate-guide-go-kart-racing',
    title: 'The Ultimate Guide to Go Kart Racing',
    excerpt: 'Everything you need to know before strapping in — from choosing the right kart to mastering cornering techniques.',
    author: 'Alex Rodriguez',
    date: 'March 15, 2026',
    image: '/images/blog/blog1.webp',
    readTime: '8 min read',
    content: `
      <p>Go-kart racing is more than just a weekend hobby — it's the gateway to competitive motorsport and an adrenaline-fueled experience unlike any other. Whether you're a first-timer or a seasoned enthusiast, understanding the fundamentals can transform your time on the track.</p>

      <h2>Choosing the Right Kart</h2>
      <p>Not all karts are created equal. At Velocity Karting, we offer three tiers of machines designed for different skill levels. Our <strong>Standard karts</strong> feature 200cc four-stroke engines perfect for beginners, delivering smooth and predictable power. The <strong>Premium karts</strong> bump up to 270cc with enhanced suspension for faster lap times. For the truly competitive, our <strong>VIP Pro karts</strong> boast 390cc engines with racing-spec tires that can push 70 km/h on the straights.</p>

      <h2>Mastering the Racing Line</h2>
      <p>The fastest path around a track isn't always the shortest. The racing line — the optimal path through each corner — involves braking in a straight line before the turn, clipping the apex (the innermost point of the corner), and accelerating out wide. This technique alone can shave seconds off your lap time.</p>
      <p>Think of it this way: <em>slow in, fast out</em>. Entering a corner too quickly will cause you to understeer wide and lose time on the exit. Instead, brake early, turn in smoothly, and get on the throttle as soon as you see the exit.</p>

      <h2>Body Position Matters</h2>
      <p>Your seating position affects the kart's handling more than you might think. Sit upright with your back firmly against the seat. Keep your hands at the 9-and-3 position on the steering wheel, and avoid crossing your arms during sharp turns. Lean into corners slightly — this shifts the kart's weight distribution and improves grip.</p>

      <h2>Race Day Etiquette</h2>
      <p>Respect on the track is paramount. Always check your mirrors before changing lines, yield to faster karts when being lapped, and avoid aggressive bumping. Clean racing not only keeps everyone safe — it also makes you faster by maintaining momentum.</p>

      <h2>Getting Started at Velocity Karting</h2>
      <p>Ready to hit the track? Book a session online, arrive 15 minutes early for your safety briefing, and let our team handle the rest. We provide all the gear — helmet, gloves, and race suit. All you need to bring is your competitive spirit.</p>
    `
  },
  {
    id: 'safety-essential-tips',
    title: 'Safety First: Essential Go Kart Safety Tips',
    excerpt: 'Go karting is thrilling, but safety should always come first. Learn the essential safety protocols every racer should know.',
    author: 'Sarah Mitchell',
    date: 'March 8, 2026',
    image: '/images/blog/blog2.webp',
    readTime: '6 min read',
    content: `
      <p>At Velocity Karting, safety isn't just a priority — it's the foundation of everything we do. Every year, thousands of people enjoy karting without incident because of proper safety measures. Here's what you need to know to stay safe on the track.</p>

      <h2>Gear Up Properly</h2>
      <p>Never get into a kart without proper safety equipment. At minimum, you need a <strong>full-face helmet</strong> that fits snugly (we provide DOT-certified helmets in all sizes), a <strong>race suit</strong> to protect against track rash, and <strong>closed-toe shoes</strong> with good grip for the pedals. Our VIP package includes premium racing gloves for enhanced steering control.</p>

      <h2>The Pre-Race Safety Briefing</h2>
      <p>Our mandatory briefing covers flag signals (green for go, yellow for caution, red for stop, black for pit in), track rules, and emergency procedures. Pay attention — understanding these signals is crucial for your safety and the safety of others.</p>

      <h2>Understanding Kart Limits</h2>
      <p>Modern rental karts have built-in speed limiters and bumpers, but they still require respect. Never attempt to spin out intentionally, avoid tail-gating at high speed, and always maintain a safe following distance. If your kart feels unusual — vibrations, pulling to one side, odd noises — raise your hand and pull off the racing line. Our marshals will assist you immediately.</p>

      <h2>Weather Considerations</h2>
      <p>Wet conditions dramatically change the track dynamics. Grip levels drop significantly, braking distances increase, and the racing line changes (avoid the normally rubberized racing line in the wet, as it becomes the slipperiest part of the track). We adjust kart speeds during rain and provide wet-weather briefings.</p>

      <h2>Physical Preparation</h2>
      <p>Go-karting is surprisingly physical. Stay hydrated before your session, avoid heavy meals within an hour of racing, and warm up your neck muscles — the G-forces in corners can strain an unprepared neck. If you feel dizzy or unwell during a session, signal a marshal immediately.</p>
    `
  },
  {
    id: 'top-5-tracks-worldwide',
    title: 'Top 5 Go Kart Tracks Around the World',
    excerpt: 'From the neon-lit circuits of Tokyo to the sun-baked tracks of Dubai, explore the world\'s most incredible karting venues.',
    author: 'Marcus Lee',
    date: 'February 28, 2026',
    image: '/images/blog/blog3.webp',
    readTime: '7 min read',
    content: `
      <p>Go-kart racing has exploded globally, and some venues have elevated the experience into something truly extraordinary. Here are five tracks that every karting enthusiast should have on their bucket list.</p>

      <h2>1. Ebisu Circuit — Fukushima, Japan</h2>
      <p>Nestled in the mountains of Fukushima Prefecture, Ebisu Circuit offers a karting experience that blends precision Japanese engineering with breathtaking alpine scenery. The track features elevation changes of over 20 meters, technical hairpins, and a legendary tunnel section. Night racing sessions under atmospheric Japanese lantern lighting make this a truly unique experience.</p>

      <h2>2. Dubai Kartdrome — UAE</h2>
      <p>The official CIK-FIA circuit in the Middle East, Dubai Kartdrome offers a 1.2 km outdoor track designed by the same architects who designed several Formula 1 circuits. With professional-grade timing systems, floodlit evening sessions (essential in the desert heat), and karts reaching 80 km/h, this is as close to professional racing as recreational karting gets.</p>

      <h2>3. Karting Genk — Belgium</h2>
      <p>Known as the "Home of Champions," this Belgian track has produced multiple F1 drivers including Max Verstappen. The 1,360-meter circuit features 22 demanding corners and is used for CIK-FIA World Championship events. Even if you're renting, racing where future world champions trained adds an incredible sense of history to every lap.</p>

      <h2>4. K1 Speed — Multiple Locations, USA</h2>
      <p>America's premier indoor karting chain has perfected the electric kart experience. Their 20+ horsepower electric karts deliver instant torque and reach speeds of 72 km/h in climate-controlled comfort. The Arrive & Drive format makes it accessible, and their Paddock Lounge adds a premium social element with craft food and racing simulators.</p>

      <h2>5. Velocity Karting — Right Here!</h2>
      <p>We may be biased, but our track was designed with input from professional racing drivers to deliver the most exciting recreational karting experience possible. With three track configurations, state-of-the-art electric and petrol karts, a fully equipped pit area, and competitive pricing — why look elsewhere? Book your session today and see for yourself!</p>
    `
  },
  {
    id: 'improve-lap-times-pro-tips',
    title: 'How to Improve Your Lap Times: Pro Tips',
    excerpt: 'Professional racing drivers share their secrets for shaving seconds off your go-kart lap times.',
    author: 'James Cooper',
    date: 'February 20, 2026',
    image: '/images/blog/blog4.webp',
    readTime: '9 min read',
    content: `
      <p>Shaving a tenth of a second off your lap time might not sound like much, but in karting, it's the difference between first and fifth. We asked three professional racing drivers who started in karts for their best advice.</p>

      <h2>Smooth is Fast</h2>
      <p>The biggest mistake amateur drivers make is being too aggressive with inputs. Jerky steering, stabbing the brakes, and slamming the throttle all unsettle the kart and scrub speed. <strong>Focus on being smooth</strong> — gentle steering inputs, progressive braking, and gradual throttle application. You'll feel slower but the stopwatch won't lie.</p>

      <h2>Look Where You Want to Go</h2>
      <p>Your body naturally follows your eyes. If you stare at the wall, you'll hit the wall. Instead, always look ahead to where you want the kart to be next — the apex of the upcoming corner, the exit point, or the braking zone for the following turn. This forward-looking technique also gives you more time to react.</p>

      <h2>Trail Braking: The Advanced Technique</h2>
      <p>Most beginners brake in a straight line, then turn. Advanced drivers <em>trail brake</em> — they begin braking before the corner and gradually release the brake as they turn in. This shifts weight to the front tires, increasing front grip through the initial phase of the corner. It's a technique that takes practice but can be worth 0.3-0.5 seconds per corner.</p>

      <h2>Analyze Your Data</h2>
      <p>At Velocity Karting, every session is timed with sector splits. Study your times — identify which sectors you're losing time in and focus your effort there. Often, drivers are fast in some sections and slow in others. Your overall time is only as fast as your weakest sector.</p>

      <h2>Tire Management</h2>
      <p>Kart tires have a limited grip window. In the first few laps, they're cold and sliding. By mid-session, they're at optimal temperature. In the final laps, they may begin to overheat and lose grip. Adjust your driving accordingly — be cautious on cold tires, push hard in the sweet spot, and manage your aggression when grip fades.</p>

      <h2>Practice Consistency, Then Push</h2>
      <p>Don't try to set your fastest lap immediately. Spend the first few laps being consistent — try to lap within 0.2 seconds of the same time every lap. Once you have a solid baseline, start pushing one corner at a time. This methodical approach prevents the common trap of overdriving and getting slower while feeling faster.</p>
    `
  }
];

router.get('/', (req, res) => {
  res.render('blog-list', {
    title: 'Blog — Velocity Karting',
    posts: blogPosts.map(({ id, title, excerpt, author, date, image, readTime }) => ({ id, title, excerpt, author, date, image, readTime }))
  });
});

router.get('/:id', (req, res) => {
  const post = blogPosts.find(p => p.id === req.params.id);
  if (!post) return res.status(404).render('404', { title: 'Post Not Found' });
  res.render('blog-post', { title: `${post.title} — Velocity Karting`, post });
});

module.exports = router;
