// Libraries
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
// Errors
const CustomError = require('../errors/CustomError')

class Encrypt {
  async hash(data) {
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
}

module.exports = new Encrypt()
