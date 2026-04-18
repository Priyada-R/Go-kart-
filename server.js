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

// Explicit Native Server Bind
console.log('Initiating server.listen() binding call...');
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});