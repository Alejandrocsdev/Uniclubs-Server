// Errors
const CustomError = require('../errors/CustomError')

function defaultRoute(req, res, next) {
  const err = new CustomError(404, `No matching route found for ${req.method} ${req.originalUrl}`)
  next(err)
}

module.exports = defaultRoute
