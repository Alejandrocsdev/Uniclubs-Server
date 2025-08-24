const { Router } = require('express')
const router = Router()

const { clubController } = require('../controllers')

// Middlewares
const { jwtAuth } = require('../middlewares')

router.get('/', jwtAuth(), clubController.getClubs)
router.get('/:clubId', jwtAuth(), clubController.getClub)

module.exports = router
