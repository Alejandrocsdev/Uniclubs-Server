// Models
const { User } = require('../models')
// Middlewares
const { asyncError } = require('../middlewares')
// Utilities
const { encrypt, excludeFields } = require('../utils')
// Errors
const CustomError = require('../errors/CustomError')

class UserController {
  getUsers = asyncError(async (req, res) => {
    const { ts } = req.query

    const exclude = excludeFields(ts, ['password'])

    const users = await User.findAll({ attributes: { exclude } })

    res.status(200).json({ message: 'All users retrieved successfully.', users })
  })

  getUser = asyncError(async (req, res) => {
    const { userId } = req.params
    const { ts } = req.query

    const exclude = excludeFields(ts, ['password'])

    const user = await User.findByPk(userId, { attributes: { exclude } })
    if (!user) throw new CustomError(404, 'User not found.')

    res.status(200).json({ message: `User ${userId} retrieved successfully.`, user })
  })

  postUser = asyncError(async (req, res) => {
    const { username, password, rePassword, email } = req.body

    if (!username || !password || !rePassword || !email) {
      throw new CustomError(400, 'Missing required fields.')
    }

    if (password !== rePassword) {
      throw new CustomError(400, 'Passwords do not match.')
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw new CustomError(400, 'Invalid email format.')
    }

    const existingUser = await User.findOne({ where: { username } })
    if (existingUser) {
      throw new CustomError(409, 'Username already exists.')
    }

    const hashedPwd = await encrypt.hash(password, 10)
    const newUser = await User.create({ username, password: hashedPwd, email })

    res.status(201).json({ message: `User ${newUser.id} created successfully.`, userId: newUser.id })
  })

  putUser = asyncError(async (req, res) => {
    const { userId } = req.params
    const { username, email } = req.body

    const user = await User.findByPk(userId)
    if (!user) throw new CustomError(404, 'User not found.')

    if (username) user.username = username
    if (email) user.email = email

    await user.save()

    res.status(200).json({ message: 'User updated successfully.', userId: user.id })
  })

  deleteUser = asyncError(async (req, res) => {
    const { userId } = req.params

    const user = await User.findByPk(userId)
    if (!user) throw new CustomError(404, 'User not found.')

    await user.destroy()

    res.status(200).json({ message: 'User deleted successfully.' })
  })
}

module.exports = new UserController()
