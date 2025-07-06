// Models
const { User } = require('../models')
// Middlewares
const { asyncError } = require('../middlewares')
// Errors
const CustomError = require('../errors/CustomError')
// Utilities
const { jwt, cookie, encrypt, deleteFields } = require('../utils')

class AuthController {
  getAuthUser = asyncError(async (req, res) => {
    const { user } = req
    res.status(200).json({ message: 'Authenticated user retrieved successfully', user })
  })

  refresh = asyncError(async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) throw new CustomError(401, 'Missing refresh token')
    const refreshToken = cookies.jwt

    // Error handles by jwtError
    const { id } = jwt.verifyToken(refreshToken, 'rt')

    const user = await User.findOne({ where: { refreshToken } })

    if (!user || id !== user.id) throw new CustomError(403, 'Invalid refresh token or user mismatch')

    // const { roles } = user
    // if (!roles) throw new CustomError(403, '查無權限角色')

    const accessToken = jwt.signAccessToken(id)

    res.status(200).json({ message: 'Access token refreshed successfully', accessToken })
  })

  signIn = asyncError(async (req, res) => {
    const { user } = req
    if (!user) throw new CustomError(401, 'Sign in failed.')

    const refreshToken = jwt.signRefreshToken(user.id)
    await User.update({ refreshToken }, { where: { id: user.id } })
    cookie.store(res, refreshToken)

    // const { roles } = user
    // if (!roles) throw new CustomError(403, 'No role permissions found.')

    const accessToken = jwt.signAccessToken(user.id)

    res.status(200).json({ message: 'Sign in successful.', accessToken })
  })

  signUp = asyncError(async (req, res) => {
    const { username, password, rePassword, email } = req.body

    if (password !== rePassword) throw new CustomError(404, 'Passwords do not match.')

    const hashedPwd = await encrypt.hash(password)

    const user = await User.create({ username, password: hashedPwd, email })
    
    const newUser = deleteFields(user, ['password'])

    res.status(201).json({ message: 'User registered successfully.', user: newUser })
  })
}

module.exports = new AuthController()
