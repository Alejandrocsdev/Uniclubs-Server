// Libraries
const { TokenExpiredError, NotBeforeError, JsonWebTokenError } = require('jsonwebtoken')
// Errors
const CustomError = require('./CustomError')

const jwtError = error => {
  if (!(error instanceof JsonWebTokenError)) return

  const { jwtType } = error

  // Subclass of JsonWebTokenError
  if (error instanceof TokenExpiredError) {
    const token = jwtType === 'at' ? 'Access' : 'Refresh'
    const code = jwtType === 'at' ? 401 : 403
    console.log('error.name:', error.name)
    throw new CustomError(code, `${error.name}: ${token} token has expired`)
  }

  // Subclass of JsonWebTokenError
  if (error instanceof NotBeforeError) {
    throw new CustomError(403, `${error.name}: Token not active yet`)
  }

  // Generic JWT error (base class)
  throw new CustomError(403, `${error.name}: Invalid token`)
}

module.exports = jwtError
