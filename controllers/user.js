// Models
const { User } = require('../models')
// Middlewares
const { asyncError } = require('../middlewares')
// Utilities
const { encrypt } = require('../utils')
// Errors
const CustomError = require('../errors/CustomError')

class UserController {
  getUsers = asyncError(async (req, res) => {
    const users = await User.findAll()

    const safeUsers = users.map(user => user.getSafeData())

    res.status(200).json({ message: 'All users retrieved successfully.', users: safeUsers })
  })

  getUser = asyncError(async (req, res) => {
    const { userId } = req.params

    const user = await User.findByPk(userId)
    if (!user) throw new CustomError(404, 'User not found.')

    const safeUser = user.getSafeData()

    res.status(200).json({ message: 'User retrieved successfully.', user: safeUser })
  })

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
