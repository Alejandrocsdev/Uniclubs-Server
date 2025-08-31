// In-memory store: { 'ip:route': [timestamps] }
const rateStore = new Map()
// Errors
const CustomError = require('../errors/CustomError')

const EXCLUDED_PATHS = ['/auth/me', '/auth/refresh']
const WINDOW_MS = 60 * 1000
const MAX_REQUESTS = 5

const rateLimiter = (req, res, next) => {
  // Skip excluded paths
  if (EXCLUDED_PATHS.includes(req.path)) return next()

  const key = `${req.ip}:${req.path}`
  const now = Date.now()
  const windowStart = now - WINDOW_MS

  const timestamps = rateStore.get(key)?.filter(ts => ts > windowStart) || []

  if (timestamps.length >= MAX_REQUESTS) {
    throw new CustomError(429, 'Too many requests')
  }

  // Store timestamp
  timestamps.push(now)
  rateStore.set(key, timestamps)

  next()
}

module.exports = rateLimiter
