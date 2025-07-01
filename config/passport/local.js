// Libraries
const { Strategy } = require('passport-local')
// Models
const { User } = require('../../models')
// Utilities
const { encrypt } = require('../../utils')
// Errors
const CustomError = require('../../errors/CustomError')

const customFields = { usernameField: 'username', passwordField: 'password' }

const verifyCallback = async (username, password, cb) => {
  try {
    const user = await User.findOne({ where: { username } })

    if (!user) throw new CustomError(404, 'Invalid username or password.')

    const match = await encrypt.hashCompare(password, user.password)
    if (!match) throw new CustomError(401, 'Incorrect password.')

    cb(null, user)
  } catch (err) {
    cb(err)
  }
}

const localStrategy = new Strategy(customFields, verifyCallback)

module.exports = localStrategy
