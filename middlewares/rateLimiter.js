// Libraries
const rateLimit = require('express-rate-limit')

const rateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  // error.response.data (default structure)
  message: { message: 'Too many requests' },
  statusCode: 429
})

module.exports = rateLimiter
