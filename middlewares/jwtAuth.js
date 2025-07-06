// Models
const { User } = require('../models')
// Errors
const CustomError = require('../errors/CustomError')
// Utilities
const { jwt, excludeFields } = require('../utils')

const jwtAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) throw new CustomError(401, 'Missing authorization header')

    const token = authHeader.split(' ')[1]
    if (!token) throw new CustomError(401, 'Missing access token')

    // Error handles by jwtError
    const { id } = jwt.verifyToken(token, 'at')

    const { ts } = req.query
    const exclude = excludeFields(ts, ['password'])

    const user = await User.findByPk(id, { attributes: { exclude } })
    if (!user || id !== user.id) throw new CustomError(403, 'Invalid access token or user mismatch')

    req.user = user.toJSON()
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = jwtAuth
