// Libraries
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
// Errors
const CustomError = require('../errors/CustomError')

class Encrypt {
  async hash(data) {
    if (typeof data !== 'string') {
      throw new CustomError(400, 'Data to hash must be a string')
    }
    try {
      const salt = await bcrypt.genSaltSync(10)
      return await bcrypt.hash(data, salt)
    } catch (error) {
      throw new CustomError(500, 'Hashing failed')
    }
  }

  async hashCompare(data, hashedData) {
    try {
      return await bcrypt.compare(data, hashedData)
    } catch (error) {
      throw new CustomError(500, 'Hash comparison failed')
    }
  }

  secret() {
    try {
      return crypto.randomBytes(32).toString('hex')
    } catch (error) {
      throw new CustomError(500, 'Secret key generation failed')
    }
  }

  token() {
    try {
      return crypto.randomBytes(32).toString('base64url')
    } catch (error) {
      throw new CustomError(500, 'Token generation failed')
    }
  }

  sha256(token) {
    try {
      return crypto.createHash('sha256').update(token).digest('hex')
    } catch (error) {
      throw new CustomError(500, 'SHA256 hash generation failed')
    }
  }

  otp() {
    try {
      return crypto.randomInt(100000, 1000000)
    } catch (error) {
      throw new CustomError(500, 'OTP generation failed')
    }
  }

  uid(length = 8) {
    try {
      //  0/O, no 1/I
      // 32 (power of two → no modulo bias worries)
      const alphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'

      let result = ''
      const N = alphabet.length

      for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * N)
        result += alphabet[index]
      }

      return result
    } catch (error) {
      throw new CustomError(500, 'uid generation failed')
    }
  }
}

module.exports = new Encrypt()
