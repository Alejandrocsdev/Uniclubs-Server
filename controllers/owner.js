// Models
const { Club, Token } = require('../models')
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
    const { name, timeZone } = req.body

    await Club.create({ name, timeZone })

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
}

module.exports = new OwnerController()
