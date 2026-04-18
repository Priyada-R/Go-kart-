require('dotenv').config();
console.log('--- Render Engine Booting Sequence Started ---');
const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');
const session = require('express-session');


const app = express();
const PORT = process.env.PORT || 3000;
console.log(`Configured to bind to port: ${PORT}`);

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret123',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get("/health", (req, res) => {
  res.send("OK");
});

app.use('/', require('./routes/index'));
app.use('/booking', require('./routes/booking'));
app.use('/feedback', require('./routes/feedback'));
app.use('/gallery', require('./routes/gallery'));
app.use('/blog', require('./routes/blog'));
app.use('/faq', require('./routes/faq'));
app.use('/api', require('./routes/api'));
app.use('/admin', require('./routes/admin'));

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// Ultimate Fallback Server Binding Protocol
const host = process.env.RENDER ? '0.0.0.0' : undefined;

app.listen(PORT, host, () => {
  console.log(`\n\n-----------------------------------------`);
  console.log(`🚀 Velocity Karting SERVER ACTIVATED!`);
  console.log(`🟢 Network: Listening on PORT ${PORT}`);
  console.log(`🌐 Host Interface: ${host || 'Default/Dynamic'}`);
  console.log(`-----------------------------------------\n\n`);
});