// Models
const { User } = require('../models')
// Middlewares
const { asyncError } = require('../middlewares')
// Errors
const CustomError = require('../errors/CustomError')
// Utilities
const { encrypt, cookie } = require('../utils')

class AuthController {
  getAuthUser = asyncError(async (req, res) => {
    const { user } = req
    res.status(200).json({ message: 'Authenticated user retrieved successfully', user })
  })

  refresh = asyncError(async (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) throw new CustomError(401, 'Missing refresh token')

    const refreshToken = cookies.jwt

    const user = await User.findOne({ where: { refreshToken } })

    const { id } = encrypt.verifyToken(refreshToken, 'rt')
    if (!user || id !== user.id) throw new CustomError(403, 'Failed to refresh access token')

    // const { roles } = user
    // if (!roles) throw new CustomError(403, '查無權限角色')

    const accessToken = encrypt.signAccessToken(id)

    res.status(200).json({ message: 'Access token refreshed successfully', accessToken })
  })

  signIn = asyncError(async (req, res) => {
    const { user } = req
    if (!user) throw new CustomError(401, 'Sign in failed.')

    const refreshToken = encrypt.signRefreshToken(user.id)
    await User.update({ refreshToken }, { where: { id: user.id } })
    cookie.store(res, refreshToken)

    // const { roles } = user
    // if (!roles) throw new CustomError(403, 'No role permissions found.')

    const accessToken = encrypt.signAccessToken(user.id)
    res.status(200).json({ message: 'Sign in successful.', accessToken })
  })

  signUp = asyncError(async (req, res) => {
    const { username, password, rePassword, email } = req.body
    res.status(200).json({ message: 'Sign up successful.' })
  })
}

module.exports = new AuthController()
