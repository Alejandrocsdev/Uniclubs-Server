// Models
const { User } = require('../models')
// Utilities
const { jwt } = require('../utils')
// Errors
const CustomError = require('../errors/CustomError')

const jwtAuth = role => async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) throw new CustomError(401, 'Missing authorization header')

    const token = authHeader.split(' ')[1]
    if (!token) throw new CustomError(401, 'Missing access token')

    // Error handles by jwtError
    const { userId } = jwt.verifyToken(token, 'at')

    const user = await User.findByPk(userId)
    if (!user || userId !== user.id) throw new CustomError(403, 'Invalid access token or user mismatch')

    const roles = user.roles.map(role => role.name)
    if (role && !roles.includes(role)) throw new CustomError(403, `Access denied: requires role [${role}]`)

    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = jwtAuth
