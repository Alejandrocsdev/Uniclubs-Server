const { Router } = require('express')
const router = Router()

const { adminController } = require('../controllers')

// Middlewares
const { checkId, jwtAuth, validate } = require('../middlewares')
// Schemas
const { createVenues, createRules, createPlans } = require('../schemas/admin')

// Validate clubId, venueId
const ids = ['clubId', 'venueId']
ids.forEach(id => router.param(id, checkId))

router.post('/clubs/:clubId/venues', jwtAuth('admin'), validate(createVenues), adminController.createVenues)
router.post('/venues/:venueId/rules', jwtAuth('admin'), validate(createRules), adminController.createRules)
router.post('/clubs/:clubId/plans', jwtAuth('admin'), validate(createPlans), adminController.createPlans)

module.exports = router
