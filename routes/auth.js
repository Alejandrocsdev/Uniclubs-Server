const { Router } = require('express')
const router = Router()

const { authController } = require('../controllers')

// Middlewares
const { jwtAuth, rateLimiter } = require('../middlewares')
const { signInAuth } = require('../config/passport')

// With Credentials
router.get('/me', jwtAuth, authController.getAuthUser)
router.post('/refresh', authController.refresh)
router.post('/sign-in', rateLimiter, signInAuth, authController.signIn)

// Without Credentials
router.post('/sign-up', authController.signUp)

router.post('/email/otp', authController.emailOtp)

module.exports = router
