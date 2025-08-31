// Errors
const CustomError = require('../errors/CustomError')

const defaultRoute = (req, res, next) => {
  const error = new CustomError(404, `No matching route found for ${req.method} ${req.originalUrl}`)
  next(error)
}

module.exports = defaultRoute
