const { Router } = require('express')
const router = Router()

const { clubController } = require('../controllers')

// Middlewares
const { jwtAuth } = require('../middlewares')

router.get('/', jwtAuth, clubController.getAllClubs)

module.exports = router
