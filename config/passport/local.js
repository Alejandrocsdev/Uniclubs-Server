// Libraries
const { Strategy } = require('passport-local')
// Models
const { User } = require('../../models')
// Utilities
const { encrypt } = require('../../utils')
// Errors
const CustomError = require('../../errors/CustomError')

const customFields = { usernameField: 'username', passwordField: 'password' }

const verifyCallback = async (username, password, done) => {
  try {
    const user = await User.findOne({ where: { username } })
    if (!user) throw new CustomError(404, 'Username does not exist.')

    const match = await encrypt.hashCompare(password, user.password)
    if (!match) throw new CustomError(401, 'Password mismatch.')

    done(null, user)
  } catch (error) {
    done(error)
  }
}

const localStrategy = new Strategy(customFields, verifyCallback)

module.exports = localStrategy
