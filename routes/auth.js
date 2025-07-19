const { Router } = require('express')
const router = Router()

const { authController } = require('../controllers')

// Middlewares
const { jwtAuth, otpAuth, rateLimiter } = require('../middlewares')
const { pwdAuth } = require('../config/passport')

// With Credentials
router.get('/me', jwtAuth, authController.getAuthUser)
router.post('/refresh', authController.refresh)
router.post('/sign-in', rateLimiter, pwdAuth, authController.signIn)

// Without Credentials
router.post('/sign-up', otpAuth, authController.signUp)
router.post('/email/otp', authController.emailOtp)

module.exports = router
