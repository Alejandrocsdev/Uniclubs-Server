// Models
const { User } = require('../models')
// Errors
const CustomError = require('../errors/CustomError')
// Utilities
const { omitFields, encrypt } = require('../utils')

const jwtAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) throw new CustomError(401, 'Missing authorization header')

    const token = authHeader.split(' ')[1]
    if (!token) throw new CustomError(401, 'Missing access token')

    const payload = encrypt.verifyToken(token, 'at')
    if (!payload || !payload.id) throw new CustomError(401, 'Invalid token payload')

    const currentTime = Math.floor(Date.now() / 1000)
    if (payload.exp && payload.exp < currentTime) throw new CustomError(401, 'Access token expired')

    const { ts } = req.query
    const exclude = omitFields(ts, ['password'])

    const user = await User.findByPk(payload.id, { attributes: { exclude } })
    if (!user) throw new CustomError(403, 'User not found')

    req.user = user.toJSON()
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = jwtAuth
