// Models
const { User } = require('../models')
// Middlewares
const { asyncError } = require('../middlewares')
// Transporter
const sendMail = require('../config/email')
// Errors
const CustomError = require('../errors/CustomError')
// Utilities
const { encrypt } = require('../utils')

class RecoveryController {
  recoverPwd = asyncError(async (req, res) => {
    const { password, email } = req.body
    const { otp } = req

    const hashedPwd = await encrypt.hash(password)

    await Promise.all([
      User.update({ password: hashedPwd }, { where: { email } }),
      otp.update({ expireTime: Date.now() })
    ])

    res.status(200).json({ message: 'User password reset successfully.' })
  })

  recoverUsr = asyncError(async (req, res) => {
    const { email } = req.body
    const { otp } = req

    const user = await User.findOne({ where: { email } })
    if (!user) throw new CustomError(404, 'No account is associated with this email address.')

    await Promise.all([
      sendMail({ email, username: user.username }, 'username'),
      otp.update({ expireTime: Date.now() })
    ])

    res.status(200).json({ message: 'User username sent successfully.' })
  })
}

module.exports = new RecoveryController()
