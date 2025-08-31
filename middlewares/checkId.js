// Errors
const CustomError = require('../errors/CustomError')

const checkId = (req, res, next, val, name) => {
  const id = Number(val)
  if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
    const error = new CustomError(400, 'Invalid ID')
    return next(error)
  }
  req.params[name] = id
  next()
}

module.exports = checkId
