// Models
const { sequelize, User, Otp, Role, Token, Club } = require('../models')
// Sequelize Operations
const { Op } = require('sequelize')
// Middlewares
const { asyncError } = require('../middlewares')
// Transporter
const sendMail = require('../config/email')
// Errors
const CustomError = require('../errors/CustomError')
// Utilities
const { jwt, cookie, encrypt } = require('../utils')

class AuthController {
  getAuthUser = asyncError(async (req, res) => {
    const { user } = req

    res.status(200).json({ message: 'Authenticated user retrieved successfully', user: user.getSafeData() })
  })

  refresh = asyncError(async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) throw new CustomError(401, 'Missing refresh token.')

    const refreshToken = cookies.jwt

    // Error handles by jwtError
    const { userId } = jwt.verifyToken(refreshToken, 'rt')

    const user = await User.findOne({ where: { refreshToken } })
    if (!user || userId !== user.id) throw new CustomError(403, 'Invalid refresh token or user mismatch.')

    const accessToken = jwt.signAccessToken(userId)

    res.status(200).json({ message: 'Access token refreshed successfully', accessToken })
  })

  signIn = asyncError(async (req, res) => {
    const { user } = req

    const refreshToken = jwt.signRefreshToken(user.id)
    await User.update({ refreshToken }, { where: { id: user.id } })

    cookie.store(res, refreshToken)

    res.status(200).json({ message: 'Sign in successful.' })
  })

  signUpUser = asyncError(async (req, res) => {
    const { username, password, email } = req.body
    const { otp } = req

    const role = await Role.findOne({ where: { name: 'user' } })
    if (!role) throw new CustomError(500, 'User role not found.')

    const hashedPwd = await encrypt.hash(password)
    const attempts = 3

    await sequelize.transaction(async t => {
      for (let i = 0; i < attempts; i++) {
        const uid = encrypt.uid()

        try {
          const user = await User.create({ uid, username, password: hashedPwd, email }, { transaction: t })

          await user.addRole(role, { transaction: t })

          await otp.update({ expireTime: Date.now() }, { transaction: t })

          break
        } catch (error) {
          if (error.name === 'SequelizeUniqueConstraintError' && error.fields?.uid) {
            if (i < attempts - 1) continue
            throw new CustomError(500, 'uid generation failed.')
          }
          throw error
        }
      }
    })
    res.status(201).json({ message: 'User registered successfully.' })
  })

  signUpAdmin = asyncError(async (req, res) => {
    const { username, password, email, token } = req.body
    const { otp } = req

    const hashedToken = encrypt.sha256(token)

    const tokenRecord = await Token.findOne({ where: { token: hashedToken } })
    if (!tokenRecord) throw new CustomError(400, 'Invalid token.')

    const { clubId } = tokenRecord

    const club = await Club.findByPk(clubId)
    if (!club) throw new CustomError(404, 'Club not found.')

    const roles = await Role.findAll({ where: { name: ['user', 'admin'] } })
    if (!roles) throw new CustomError(500, 'User role not found.')

    const hashedPwd = await encrypt.hash(password)
    const attempts = 3

    await sequelize.transaction(async t => {
      for (let i = 0; i < attempts; i++) {
        const uid = encrypt.uid()

        try {
          const user = await User.create({ uid, username, password: hashedPwd, email }, { transaction: t })

          await user.addRoles(roles, { transaction: t })
          await user.addClub(club, { transaction: t })
          await otp.update({ expireTime: Date.now() }, { transaction: t })

          break
        } catch (error) {
          if (error.name === 'SequelizeUniqueConstraintError' && error.fields?.uid) {
            if (i < attempts - 1) continue
            throw new CustomError(500, 'uid generation failed.')
          }
          throw error
        }
      }
    })
    res.status(201).json({ message: 'Admin registered successfully.' })
  })

  signOut = asyncError(async (req, res) => {
    const { user } = req

    // Clear the refresh token in the database
    await User.update({ refreshToken: null }, { where: { id: user.id } })

    // Clear the refresh token cookie from the browser
    cookie.clear(res)

    res.status(200).json({ message: 'User signed out successfully.' })
  })

  emailOtp = asyncError(async (req, res) => {
    const { email, purpose } = req.body

    const otp = String(encrypt.otp())
    const hashedOtp = await encrypt.hash(otp)
    const expireTime = Date.now() + 15 * 60 * 1000

    await sequelize.transaction(async t => {
      const otpRecord = await Otp.findOne({ where: { email, purpose }, transaction: t, lock: t.LOCK.UPDATE })

      if (otpRecord) {
        // Case 1: OTP already exists — update its OTP and expiration time
        await otpRecord.update({ otp: hashedOtp, expireTime }, { transaction: t })
      } else {
        // lt: less than
        // Case 2: Email does not exists — check for any expired record to reuse
        const expiredRecord = await Otp.findOne({
          where: { expireTime: { [Op.lt]: Date.now() } },
          transaction: t,
          lock: t.LOCK.UPDATE,
          skipLocked: true // <-- prevents blocking on the same expired row
        })
        if (expiredRecord) {
          // Case 2a: Found expired record — update it with new email, OTP, and expiration time
          await expiredRecord.update({ otp: hashedOtp, email, expireTime, purpose }, { transaction: t })
        } else {
          // Case 2b: No expired record — create a new OTP entry
          await Otp.create({ otp: hashedOtp, email, expireTime, purpose }, { transaction: t })
        }
      }

      t.afterCommit(async () => {
        await sendMail({ email, otp }, 'otp')
      })
    })
    res.status(200).json({ message: 'Email sent successfully.' })
  })

  resetPassword = asyncError(async (req, res) => {
    const { password, email } = req.body
    const { otp } = req

    const hashedPwd = await encrypt.hash(password)

    await sequelize.transaction(async t => {
      const user = await User.findOne({ where: { email }, transaction: t, lock: t.LOCK.UPDATE })
      if (!user) throw new CustomError(404, 'No account is associated with this email address.')

      await user.update({ password: hashedPwd }, { transaction: t })
      await otp.update({ expireTime: Date.now() }, { transaction: t })
    })

    res.status(200).json({ message: 'User password reset successfully.' })
  })

  recoverUsername = asyncError(async (req, res) => {
    const { email } = req.body
    const { otp } = req

    await sequelize.transaction(async t => {
      const user = await User.findOne({ where: { email } }, { transaction: t, lock: t.LOCK.SHARE })
      if (!user) throw new CustomError(404, 'No account is associated with this email address.')

      await otp.update({ expireTime: Date.now() }, { transaction: t })

      t.afterCommit(async () => {
        await sendMail({ email, username: user.username }, 'username')
      })
    })

    res.status(200).json({ message: 'User username sent successfully.' })
  })

  verifyToken = asyncError(async (req, res) => {
    const { token } = req.params
    const hashedToken = encrypt.sha256(token)

    const tokenRecord = await Token.findOne({ where: { token: hashedToken } })
    if (!tokenRecord) throw new CustomError(400, 'Invalid token.')

    const { clubId } = tokenRecord

    const club = await Club.findByPk(clubId, { attributes: ['id', 'name'] })
    if (!club) throw new CustomError(404, 'Club not found.')

    res.status(200).json({ message: 'Admin registration token verified successfully.', clubName: club.name })
  })
}

module.exports = new AuthController()
