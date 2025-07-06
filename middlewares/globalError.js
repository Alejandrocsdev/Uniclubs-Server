// Libraries
const { jwtError, sqlError } = require('../errors')

function globalError(error, req, res, next) {
  // Complete error stack trace for debugging
  if (process.env.NODE_ENV === 'development') console.error(error)

  try {
    jwtError(error) // Jason web token error
    sqlError(error) // Sequelize error
  } catch (customError) {
    error = customError
  }

  res.status(error.code || 500).json({ message: error.message, ...(error.details && { details: error.details }) })
}

module.exports = globalError
