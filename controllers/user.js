// Middlewares
const { asyncError } = require('../middlewares')
// Utilities
const { encrypt } = require('../utils')
// Errors
const CustomError = require('../errors/CustomError')

class UserController {
  updatePassword = asyncError(async (req, res) => {
    const { user } = req
    const { password, newPassword } = req.body

    const match = await encrypt.hashCompare(password, user.password)
    if (!match) throw new CustomError(401, 'Password mismatch.')

    const hashedPwd = await encrypt.hash(newPassword)
    await user.update({ password: hashedPwd })

    res.status(200).json({ message: 'User password updated successfully.' })
  })
}

module.exports = new UserController()
