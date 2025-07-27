// Models
const { User } = require('../models')
// Utilities
const { jwt } = require('../utils')
// Errors
const CustomError = require('../errors/CustomError')

const jwtAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) throw new CustomError(401, 'Missing authorization header')

    const token = authHeader.split(' ')[1]
    if (!token) throw new CustomError(401, 'Missing access token')

    // Error handles by jwtError
    const { id } = jwt.verifyToken(token, 'at')

    const user = await User.findByPk(id)
    if (!user || id !== user.id) throw new CustomError(403, 'Invalid access token or user mismatch')

    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = jwtAuth
