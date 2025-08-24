// Models
// const { Club, Token, User, Role, Schedule } = require('../models')
// Sequelize Operations
// const { Op } = require('sequelize')
// Middlewares
const { asyncError } = require('../middlewares')
// Transporter
// const sendMail = require('../config/email')
// Errors
const CustomError = require('../errors/CustomError')
// Utilities
// const { encrypt, time, clientUrl } = require('../utils')

class AdminController {
  updateSchedule = asyncError(async (req, res) => {

    res.status(200).json({ message: 'Update schedule successfully.' })
  })
}

module.exports = new AdminController()
