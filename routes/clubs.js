const { Router } = require('express')
const router = Router()

const { clubController } = require('../controllers')

// Middlewares
const { checkId, jwtAuth } = require('../middlewares')

// Validate clubId
router.param('clubId', checkId)

router.get('/', jwtAuth(), clubController.getClubs)
router.get('/:clubId', jwtAuth(), clubController.getClub)

module.exports = router
