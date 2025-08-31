const { Router } = require('express')
const router = Router()

const { authController } = require('../controllers')

// Middlewares
const { pwdAuth, jwtAuth, otpAuth, validate } = require('../middlewares')
// Schemas
const { signUpUser, signUpAdmin, emailOtp, resetPassword, recoverUsername, verifyToken } = require('../schemas/auth')

// With Credentials
router.get('/me', jwtAuth(), authController.getAuthUser)
router.post('/refresh', authController.refresh)
router.post('/sign-in', pwdAuth, authController.signIn)
router.post('/sign-out', jwtAuth(), authController.signOut)

// Without Credentials
router.post('/email-otp', validate(emailOtp), authController.emailOtp)
router.post('/sign-up/user', otpAuth('sign-up:user'), validate(signUpUser), authController.signUpUser)
router.post('/sign-up/admin', otpAuth('sign-up:admin'), validate(signUpAdmin), authController.signUpAdmin)
router.post('/reset-password', otpAuth('reset-password'), validate(resetPassword), authController.resetPassword)
router.post('/recover-username', otpAuth('recover-username'), validate(recoverUsername), authController.recoverUsername)
router.get('/:token/verify', validate(verifyToken), authController.verifyToken)

module.exports = router
