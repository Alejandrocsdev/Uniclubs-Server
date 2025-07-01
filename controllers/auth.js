// Middlewares
const { asyncError } = require('../middlewares')
// Errors
const CustomError = require('../errors/CustomError')

class AuthController {
  signIn = asyncError(async (req, res) => {
    const { user } = req

    if (!user) throw new CustomError(401, 'Sign in failed.')

    // const refreshToken = encrypt.signRefreshToken(user.id)
    // await User.update({ refreshToken }, { where: { id: user.id } })
    // cookie.store(res, refreshToken)

    // const { roles } = user
    // if (!roles) throw new CustomError(403, 'No role permissions found.')

    // const accessToken = encrypt.signAccessToken(user.id, roles)
    // res.status(200).json({ message: 'Sign in successful.', accessToken })

    const signedUser = user.toJSON()
    res.status(200).json({ message: 'Sign in successful.', user: signedUser })
  })
}

module.exports = new AuthController()
