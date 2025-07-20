const { Router } = require('express')
const router = Router()

const { recoveryController } = require('../controllers')

// Middlewares
const { otpAuth } = require('../middlewares')

// Without Credentials
router.post('/password', otpAuth('pwd-reset'), recoveryController.recoverPwd)
router.post('/username', otpAuth('usr-recovery'), recoveryController.recoverUsr)

module.exports = router
