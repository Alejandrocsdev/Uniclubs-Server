const { Router } = require('express')
const router = Router()

const { authController } = require('../controllers')

// Middlewares
const { jwtAuth, otpAuth } = require('../middlewares')
const { pwdAuth } = require('../config/passport')

// With Credentials
router.get('/me', jwtAuth, authController.getAuthUser)
router.post('/refresh', authController.refresh)
router.post('/sign-in', pwdAuth, authController.signIn)
router.post('/sign-out', jwtAuth, authController.signOut)

// Without Credentials
router.post('/sign-up', otpAuth('sign-up'), authController.signUp)
router.post('/reset-password', otpAuth('reset-password'), authController.resetPassword)
router.post('/recover-username', otpAuth('recover-username'), authController.recoverUsername)
router.post('/email-otp', authController.emailOtp)

module.exports = router
