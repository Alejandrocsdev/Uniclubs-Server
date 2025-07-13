// Libraries
const { jwtError, sqlError } = require('../errors')

function globalError(error, req, res, next) {
  // Complete error stack trace for debugging
  if (process.env.NODE_ENV === 'development') console.error(error)

  try {
    // Jason web token error
    jwtError(error) 
    // Sequelize error
    sqlError(error) 
  } catch (customError) {
    error = customError
  }

  res.status(error.code).json({ message: error.message, details: error.details })
}

module.exports = globalError
