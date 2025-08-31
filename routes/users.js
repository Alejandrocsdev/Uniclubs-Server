const { Router } = require('express')
const router = Router()

const { userController } = require('../controllers')

// Middlewares
const { checkId, jwtAuth, validate } = require('../middlewares')
// Schemas
const { updatePassword } = require('../schemas/users')

// Validate userId
router.param('userId', checkId)

router.get('/', jwtAuth('owner'), userController.getUsers)
router.patch('/password', jwtAuth('user'), validate(updatePassword), userController.updatePassword)
router.get('/:userId', jwtAuth('owner'), userController.getUser)

module.exports = router
