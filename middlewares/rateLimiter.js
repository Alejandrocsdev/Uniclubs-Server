// Libraries
const rateLimit = require('express-rate-limit')

const rateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { message: 'Too many requests (rateLimiter)' },
  statusCode: 429
})

module.exports = rateLimiter
