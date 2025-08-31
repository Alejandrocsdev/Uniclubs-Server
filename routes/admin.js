const { Router } = require('express')
const router = Router()

const { adminController } = require('../controllers')

// Middlewares
const { checkId, jwtAuth, validate } = require('../middlewares')
// Schemas
const { createVenues, createRule, createPlan, updatePlan, updatePlanStatus, addMember } = require('../schemas/admin')

// Validate clubId, venueId
const ids = ['clubId', 'venueId', 'userId', 'planId']
ids.forEach(id => router.param(id, checkId))

router.post('/clubs/:clubId/venues', jwtAuth('admin'), validate(createVenues), adminController.createVenues)
router.post('/venues/:venueId/rule', jwtAuth('admin'), validate(createRule), adminController.createRule)
router.post('/clubs/:clubId/plan', jwtAuth('admin'), validate(createPlan), adminController.createPlan)
router.put('/plans/:planId', jwtAuth('admin'), validate(updatePlan), adminController.updatePlan)
router.patch('/plans/:planId/status', jwtAuth('admin'), validate(updatePlanStatus), adminController.updatePlanStatus)
router.get('/clubs', jwtAuth('admin'), adminController.getActivePlans)
router.post('/users/:userId/membership', jwtAuth('admin'), validate(addMember), adminController.addMember)

module.exports = router
