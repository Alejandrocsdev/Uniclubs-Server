// Models
const { sequelize, Club, Token, User, Role } = require('../models')
// Sequelize Operations
const { Op } = require('sequelize')
// Middlewares
const { asyncError } = require('../middlewares')
// Transporter
const sendMail = require('../config/email')
// Errors
const CustomError = require('../errors/CustomError')
// Utilities
const { encrypt, clientUrl } = require('../utils')

class OwnerController {
  createClub = asyncError(async (req, res) => {
    const { name, timeZone, bookingDays } = req.body

    await Club.create({ name, timeZone, bookingDays })

    res.status(201).json({ message: 'Club created successfully.' })
  })

  inviteAdmin = asyncError(async (req, res) => {
    const { clubId, email } = req.body

    const club = await Club.findByPk(clubId)
    if (!club) throw new CustomError(404, 'Club not found.')

    const token = encrypt.token()
    const hashedToken = encrypt.sha256(token)
    const expireTime = Date.now() + 24 * 60 * 60 * 1000

    await sequelize.transaction(async t => {
      const tokenRecord = await Token.findOne({
        where: { clubId, email },
        transaction: t,
        lock: t.LOCK.UPDATE
      })

      if (tokenRecord) {
        await tokenRecord.update({ token: hashedToken, expireTime }, { transaction: t })
      } else {
        const expiredRecord = await Token.findOne({
          where: { expireTime: { [Op.lt]: Date.now() } },
          transaction: t,
          lock: t.LOCK.UPDATE
        })

        if (expiredRecord) {
          await expiredRecord.update({ clubId, email, token: hashedToken, expireTime }, { transaction: t })
        } else {
          await Token.create({ clubId, email, token: hashedToken, expireTime }, { transaction: t })
        }
      }

      t.afterCommit(async () => {
        const link = `${clientUrl}/sign-up?token=${token}`
        await sendMail({ email, link, club: club.name }, 'adminLink')
      })
    })

    res.status(200).json({ message: 'Admin sign-up link sent successfully.' })
  })

  makeAdmin = asyncError(async (req, res) => {
    const { uid, username, email, clubId } = req.body

    await sequelize.transaction(async t => {
      const user = await User.findOne({
        where: { uid },
        transaction: t,
        lock: t.LOCK.UPDATE
      })
      if (!user) throw new CustomError(404, 'User not found.')

      if (user.username !== username) throw new CustomError(400, 'Username does not match this user.')
      if (user.email !== email) throw new CustomError(400, 'Email does not match this user.')

      const role = await Role.findOne({ where: { name: 'admin' }, transaction: t })
      if (!role) throw new CustomError(500, 'User role not found.')

      const club = await Club.findByPk(clubId, { transaction: t })
      if (!club) throw new CustomError(404, 'Club not found.')

      const isAdmin = await user.hasRole(role, { transaction: t })
      if (!isAdmin) await user.addRole(role, { transaction: t })

      const hasClub = await user.hasClub(club, { transaction: t })
      if (!hasClub) await user.addClub(club, { transaction: t })
    })

    res.status(200).json({ message: 'Admin role and club added to user successfully.' })
  })
}

module.exports = new OwnerController()
