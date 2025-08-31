const cors = require('./cors')
const otpAuth = require('./otpAuth')
const jwtAuth = require('./jwtAuth')
const checkId = require('./checkId')
const validate = require('./validate')
const asyncError = require('./asyncError')
const globalError = require('./globalError')
const rateLimiter = require('./rateLimiter')
const defaultRoute = require('./defaultRoute')
const { pwdAuth } = require('./passport')

module.exports = {
  cors,
  otpAuth,
  jwtAuth,
  pwdAuth,
  checkId,
  validate,
  asyncError,
  globalError,
  rateLimiter,
  defaultRoute
}
