// Models
const { Otp } = require('../models')
// Utilities
const { encrypt } = require('../utils')
// Errors
const CustomError = require('../errors/CustomError')

const otpAuth = purpose => async (req, res, next) => {
  try {
    const { email, otp } = req.body
    if (!email || !otp) throw new CustomError(400, 'Missing email or OTP')

    const otpRecord = await Otp.findOne({ where: { email, purpose } })
    if (!otpRecord) throw new CustomError(400, 'OTP record not found.')

    const { otp: hashedOtp, expireTime } = otpRecord
    const match = await encrypt.hashCompare(otp, hashedOtp)

    if (!match || expireTime <= Date.now()) {
      throw new CustomError(400, 'OTP mismatch or expired.', { type: 'otp failure' })
    }

    req.otp = otpRecord
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = otpAuth
