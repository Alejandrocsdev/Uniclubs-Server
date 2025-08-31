const { Router } = require('express')
const router = Router()

const { ownerController } = require('../controllers')

// Middlewares
const { jwtAuth, validate } = require('../middlewares')
// Schemas
const { createClub, inviteAdmin, makeAdmin } = require('../schemas/owner')

router.post('/club', jwtAuth('owner'), validate(createClub), ownerController.createClub)
router.post('/invite-admin', jwtAuth('owner'), validate(inviteAdmin), ownerController.inviteAdmin)
router.patch('/make-admin', jwtAuth('owner'), validate(makeAdmin), ownerController.makeAdmin)

module.exports = router
