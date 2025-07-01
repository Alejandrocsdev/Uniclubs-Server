// Libraries
const bcrypt = require('bcryptjs')
// Errors
const CustomError = require('../errors/CustomError')

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
}

module.exports = new Encrypt()
