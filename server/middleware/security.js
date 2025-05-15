const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const validator = require('express-validator');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});

const loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 attempts per hour
  message: 'Too many login attempts, please try again later'
});

module.exports = { limiter, loginLimiter, helmet, validator };