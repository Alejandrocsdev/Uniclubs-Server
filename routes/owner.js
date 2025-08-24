const { Router } = require('express')
const router = Router()

const { ownerController } = require('../controllers')

// Middlewares
const { jwtAuth } = require('../middlewares')

router.post('/club', jwtAuth('owner'), ownerController.createClub)
router.post('/invite-admin', jwtAuth('owner'), ownerController.inviteAdmin)
router.patch('/make-admin', jwtAuth('owner'), ownerController.makeAdmin)

module.exports = router
