// Libraries
const jwt = require('jsonwebtoken')
// Errors
const CustomError = require('../errors/CustomError')

class Jwt {
  signAccessToken(userId) {
    try {
      return jwt.sign({ userId: Number(userId) }, process.env.AT_SECRET, { expiresIn: '15m' })
    } catch (error) {
      throw new CustomError(500, 'Access token generation failed')
    }
  }

  signRefreshToken(userId) {
    try {
      return jwt.sign({ userId: Number(userId) }, process.env.RT_SECRET, { expiresIn: '7d' })
    } catch (error) {
      throw new CustomError(500, 'Refresh token generation failed')
    }
  }

  verifyToken(token, type) {
    const secretMap = {
      at: process.env.AT_SECRET,
      rt: process.env.RT_SECRET,
    }

    const secret = secretMap[type]
    if (!secret) throw new CustomError(500, `Unknown token type '${type}'`)

    try {
      return jwt.verify(token, secret)
    } catch (error) {
      // Error handled globally
      error.jwtType = type
      throw error
    }
  }
}

module.exports = new Jwt()
