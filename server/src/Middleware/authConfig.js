// src/authConfig.js

const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

passport.use(new GitHubStrategy({
  clientID: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  callbackURL: 'http://localhost:5000/auth/github/callback'
},
function(accessToken, refreshToken, profile, done) {
  // Save user profile and accessToken
  return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

module.exports = passport;
