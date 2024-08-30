// const {index} = require('./src/index');

// index();


const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('./src/Middleware/authConfig');
const connectDB = require('./src/Utils/db');
const router = require('./src/Router/router');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));
app.use(session({ 
  secret: 'secret', 
  resave: false, 
  saveUninitialized: true,
  cookie: { secure: false } 
}));
app.use(passport.initialize());
app.use(passport.session());

// API routes
app.use('/api', router);

// Authentication routes
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

// Database Connection
connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
