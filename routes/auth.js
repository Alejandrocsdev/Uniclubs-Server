const { Router } = require('express')
const router = Router()

const { authController } = require('../controllers')

// Middlewares
const { jwtAuth } = require('../middlewares')
const { signInAuth } = require('../config/passport')

router.get('/me', jwtAuth, authController.getAuthUser)
router.post('/refresh', authController.refresh)
router.post('/sign-in', signInAuth, authController.signIn)
router.post('/sign-up', authController.signUp)

module.exports = router
