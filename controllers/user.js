// Models
const { User, Role } = require('../models')
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

    res.status(200).json({ message: `User ${userId} retrieved successfully.`, user: user.getSafeData() })
  })

  postUser = asyncError(async (req, res) => {
    const { username, password, email } = req.body

    if (!username || !password || !email) {
      throw new CustomError(400, 'Missing required fields.')
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

    const role = await Role.findOne({ where: { name: 'user' } })
    if (!role) throw new CustomError(500, 'Default user role not found')

    const newUser = await User.create({ username, password: hashedPwd, email })

    await newUser.addRole(role)

    await newUser.reload()

    res.status(201).json({ message: `User ${newUser.id} created successfully.`, user: newUser.getSafeData() })
  })

  putUser = asyncError(async (req, res) => {
    const { userId } = req.params
    const { username, email } = req.body

    const user = await User.findByPk(userId)
    if (!user) throw new CustomError(404, 'User not found.')

    if (username) user.username = username
    if (email) user.email = email

    await user.save()

    res.status(200).json({ message: 'User updated successfully.', user: user.getSafeData() })
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
