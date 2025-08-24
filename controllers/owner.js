// Models
const { Club, Token, User, Role, Schedule } = require('../models')
// Sequelize Operations
const { Op } = require('sequelize')
// Middlewares
const { asyncError } = require('../middlewares')
// Transporter
const sendMail = require('../config/email')
// Errors
const CustomError = require('../errors/CustomError')
// Utilities
const { encrypt, time, clientUrl } = require('../utils')

class OwnerController {
  createClub = asyncError(async (req, res) => {
    const { name, timeZone } = req.body

    const club = await Club.create({ name, timeZone })

    const startDate = time.today(timeZone)
    const { endDate, nextRuleStartDate, reminderStartDate, autoRuleDate } = time.scheduleDates(startDate)

    await club.createSchedule({ startDate, endDate, nextRuleStartDate, reminderStartDate, autoRuleDate })

    res.status(201).json({ message: 'Club created successfully.' })
  })

  inviteAdmin = asyncError(async (req, res) => {
    const { clubId, email } = req.body

    const club = await Club.findByPk(clubId)
    if (!club) throw new CustomError(404, 'Club not found.')

    const token = encrypt.token()
    const hashedToken = encrypt.sha256(token)
    const expireTime = Date.now() + 24 * 60 * 60 * 1000

    const tokenRecord = await Token.findOne({ where: { clubId, email } })

    if (tokenRecord) {
      // Case 1: Token already exists — update its token and expiration time
      await tokenRecord.update({ token: hashedToken, expireTime })
    } else {
      // lt: less than
      // Case 2: ClubId/Email do not exist — check for any expired record to reuse
      const expiredRecord = await Token.findOne({ where: { expireTime: { [Op.lt]: Date.now() } } })
      if (expiredRecord) {
        // Case 2a: Found expired record — update it with new email, token, and expiration time
        await expiredRecord.update({ clubId, token: hashedToken, email, expireTime })
      } else {
        // Case 2b: No expired record — create a new token entry
        await Token.create({ clubId, token: hashedToken, email, expireTime })
      }
    }

    const link = `${clientUrl}/sign-up?token=${token}`

    await sendMail({ email, link, club: club.name }, 'adminLink')

    res.status(200).json({ message: 'Admin sign-up link sent successfully.' })
  })

  makeAdmin = asyncError(async (req, res) => {
    const { uid, username, email, clubId } = req.body

    const user = await User.findOne({ where: { uid } })
    if (!user) throw new CustomError(404, 'User not found.')

    if (user.username !== username) throw new CustomError(400, 'Username does not match this user.')
    if (user.email !== email) throw new CustomError(400, 'Email does not match this user.')

    const role = await Role.findOne({ where: { name: 'admin' } })
    if (!role) throw new CustomError(500, 'User role not found.')

    const club = await Club.findByPk(clubId)
    if (!club) throw new CustomError(404, 'Club not found.')

    const isAdmin = await !user.hasRole(role)
    if (!isAdmin) await user.addRole(role)

    const hasClub = await user.hasClub(club)
    if (!hasClub) await user.addClub(club)

    res.status(200).json({ message: 'Admin role and club added to user successfully.' })
  })
}

module.exports = new OwnerController()
