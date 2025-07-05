// Libraries
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
// Errors
const CustomError = require('../errors/CustomError')
const jwtError = require('../errors/jwtError')

class Encrypt {
  async hash(data) {
    try {
      const salt = await bcrypt.genSaltSync(10)
      return await bcrypt.hash(data, salt)
    } catch (error) {
      throw new CustomError(500, 'Hashing failed (util: encrypt)')
    }
  }

  async hashCompare(data, hashedData) {
    try {
      return await bcrypt.compare(data, hashedData)
    } catch (error) {
      throw new CustomError(500, 'Hash comparison failed (util: encrypt)')
    }
  }

  secret() {
    try {
      return crypto.randomBytes(32).toString('hex')
    } catch (error) {
      throw new CustomError(500, 'Secret key generation failed (util: encrypt)')
    }
  }

  signAccessToken(id) {
    try {
      return jwt.sign({ id: Number(id) }, process.env.AT_SECRET, { expiresIn: '15m' })
    } catch (error) {
      throw new CustomError(500, 'Access token generation failed (util: encrypt)')
    }
  }

  signRefreshToken(id) {
    try {
      return jwt.sign({ id: Number(id) }, process.env.RT_SECRET, { expiresIn: '7d' })
    } catch (error) {
      throw new CustomError(500, 'Refresh token generation failed (util: encrypt)')
    }
  }

  verifyToken(token, type) {
    const secretMap = {
      at: process.env.AT_SECRET,
      rt: process.env.RT_SECRET
    }
    const secret = secretMap[type]
    try {
      return jwt.verify(token, secret)
    } catch (error) {
      jwtError(error)
    }
  }
}

module.exports = new Encrypt()
