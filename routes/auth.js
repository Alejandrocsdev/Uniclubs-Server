const { Router } = require('express')
const router = Router()

const { authController } = require('../controllers')

// Passport
const { pwdSignInAuth } = require('../config/passport')

router.post('/sign-in/pwd', pwdSignInAuth, authController.signIn)

module.exports = router
