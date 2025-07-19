const { Router } = require('express')
const router = Router()

const { authController } = require('../controllers')

// Middlewares
const { otpAuth } = require('../middlewares')

// Without Credentials
router.post('/recovery/password', otpAuth, authController.recoverPwd)
router.post('/recovery/username', otpAuth, authController.recoverUsr)

module.exports = router
