const { Router } = require('express')
const router = Router()

const { userController } = require('../controllers')

// Middlewares
const { jwtAuth } = require('../middlewares')

router.patch('/password', jwtAuth('user'), userController.updatePassword)

module.exports = router
