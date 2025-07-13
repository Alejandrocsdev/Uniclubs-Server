// Models
const { User, Otp } = require('../models')
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

    // const { roles } = user
    // if (!roles) throw new CustomError(403, '查無權限角色')

    const accessToken = jwt.signAccessToken(id)

    res.status(200).json({ message: 'Access token refreshed successfully', accessToken })
  })

  signIn = asyncError(async (req, res) => {
    const { user } = req
    if (!user) throw new CustomError(401, 'Sign in failed.')

    const refreshToken = jwt.signRefreshToken(user.id)
    await User.update({ refreshToken }, { where: { id: user.id } })
    cookie.store(res, refreshToken)

    // const { roles } = user
    // if (!roles) throw new CustomError(403, 'No role permissions found.')

    res.status(200).json({ message: 'Sign in successful.' })
  })

  signUp = asyncError(async (req, res) => {
    const { username, password, rePassword, email, otp } = req.body

    if (password !== rePassword) throw new CustomError(400, 'Passwords do not match.')

    const otpRecord = await Otp.findOne({ where: { email } })
    if (!otpRecord) throw new CustomError(400, 'OTP record not found.')

    const { otp: hashedOtp, expireTime } = otpRecord
    const match = await encrypt.hashCompare(otp, hashedOtp)

    if (!match || expireTime <= Date.now()) {
      throw new CustomError(400, 'OTP mismatch or expired.', { type: 'otp failure' })
    }

    const hashedPwd = await encrypt.hash(password)

    await User.create({ username, password: hashedPwd, email })

    res.status(201).json({ message: 'User registered successfully.' })
  })

  emailOtp = asyncError(async (req, res) => {
    const { email } = req.body

    const otp = String(encrypt.otp())
    const hashedOtp = await encrypt.hash(otp)
    const expireTime = Date.now() + 15 * 60 * 1000

    const otpRecord = await Otp.findOne({ where: { email } })

    if (otpRecord) {
      // Case 1: Email already exists — update its OTP and expiration time
      await otpRecord.update({ otp: hashedOtp, expireTime })
    } else {
      // lt: less than
      // Case 2: Email does not exist — check for any expired record to reuse
      const expiredRecord = await Otp.findOne({ where: { expireTime: { [Op.lt]: Date.now() } } })
      if (expiredRecord) {
        // Case 2a: Found expired record — update it with new email, OTP, and expiration time
        await expiredRecord.update({ otp: hashedOtp, email, expireTime })
      } else {
        // Case 2b: No expired record — create a new OTP entry
        await Otp.create({ otp: hashedOtp, email, expireTime })
      }
    }

    // Sends OTP via email
    await sendMail({ email, otp }, 'otp')

    res.status(200).json({ message: 'Email sent successfully.' })
  })
}

module.exports = new AuthController()
