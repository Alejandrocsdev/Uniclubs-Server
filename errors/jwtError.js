// Errors
const CustomError = require('./CustomError')

const jwtError = (error) => {
  switch (error.name) {
    case 'TokenExpiredError':
      throw new CustomError(401, 'Token has expired')

    case 'JsonWebTokenError':
      throw new CustomError(403, 'Invalid token')

    case 'NotBeforeError':
      throw new CustomError(403, 'Token not active yet')

    default:
      throw new CustomError(500, 'Token verification failed (util: encrypt)')
  }
}

module.exports = jwtError
