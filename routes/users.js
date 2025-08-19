const { Router } = require('express')
const router = Router()

const { userController } = require('../controllers')

// Middlewares
const { jwtAuth } = require('../middlewares')

router.get('/', jwtAuth('owner'), userController.getUsers)
router.patch('/password', jwtAuth('user'), userController.updatePassword)
router.get('/:userId', jwtAuth('owner'), userController.getUser)

module.exports = router
