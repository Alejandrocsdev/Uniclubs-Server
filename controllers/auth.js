// Models
const { User, Otp, Role } = require('../models')
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
    if (!cookies?.jwt) throw new CustomError(401, 'Missing refresh token')
    const refreshToken = cookies.jwt

    // Error handles by jwtError
    const { id } = jwt.verifyToken(refreshToken, 'rt')

    const user = await User.findOne({ where: { refreshToken } })
    if (!user || id !== user.id) throw new CustomError(403, 'Invalid refresh token or user mismatch')

    const accessToken = jwt.signAccessToken(id)

    res.status(200).json({ message: 'Access token refreshed successfully', accessToken })
  })

  signIn = asyncError(async (req, res) => {
    const { user } = req

    const refreshToken = jwt.signRefreshToken(user.id)
    await User.update({ refreshToken }, { where: { id: user.id } })
    cookie.store(res, refreshToken)

    res.status(200).json({ message: 'Sign in successful.' })
  })

  signUp = asyncError(async (req, res) => {
    const { username, password, email } = req.body
    const { otp } = req

    const hashedPwd = await encrypt.hash(password)

    // Step 1: Find default role
    const role = await Role.findOne({ where: { name: 'user' } })
    if (!role) throw new CustomError(500, 'Default user role not found')

    // Step 2: Create user
    const user = await User.create({ username, password: hashedPwd, email })

    // Step 3: Associate role to user
    await user.addRole(role)

    // Step 4: Update OTP
    await otp.update({ expireTime: Date.now() })

    res.status(201).json({ message: 'User registered successfully.' })
  })

  emailOtp = asyncError(async (req, res) => {
    const { email, purpose } = req.body

    const otp = String(encrypt.otp())
    const hashedOtp = await encrypt.hash(otp)
    const expireTime = Date.now() + 15 * 60 * 1000

    const otpRecord = await Otp.findOne({ where: { email, purpose } })

    if (otpRecord) {
      // Case 1: Email already exists — update its OTP and expiration time
      await otpRecord.update({ otp: hashedOtp, expireTime })
    } else {
      // lt: less than
      // Case 2: Email does not exist — check for any expired record to reuse
      const expiredRecord = await Otp.findOne({ where: { email, expireTime: { [Op.lt]: Date.now() }, purpose } })
      if (expiredRecord) {
        // Case 2a: Found expired record — update it with new email, OTP, and expiration time
        await expiredRecord.update({ otp: hashedOtp, email, expireTime })
      } else {
        // Case 2b: No expired record — create a new OTP entry
        await Otp.create({ otp: hashedOtp, email, expireTime, purpose })
      }
    }

    // Sends OTP via email
    await sendMail({ email, otp }, 'otp')

    res.status(200).json({ message: 'Email sent successfully.' })
  })
}

module.exports = new AuthController()
