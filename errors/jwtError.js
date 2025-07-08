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
    throw new CustomError(code, `${token} token has expired (jwtError: TokenExpiredError)`)
  }

  // Subclass of JsonWebTokenError
  if (error instanceof NotBeforeError) {
    throw new CustomError(403, 'Token not active yet (jwtError: NotBeforeError)')
  }

  // Generic JWT error (base class)
  throw new CustomError(403, 'Invalid token (jwtError: JsonWebTokenError)')
}

module.exports = jwtError
