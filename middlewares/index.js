const otpAuth = require('./otpAuth')
const jwtAuth = require('./jwtAuth')
const rateLimiter = require('./rateLimiter')
const asyncError = require('./asyncError')
const defaultRoute = require('./defaultRoute')
const globalError = require('./globalError')

module.exports = { otpAuth, jwtAuth, rateLimiter, asyncError, defaultRoute, globalError }
