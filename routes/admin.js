const { Router } = require('express')
const router = Router()

const { adminController } = require('../controllers')

// Middlewares
const { jwtAuth } = require('../middlewares')

router.patch('/schedule', jwtAuth('admin'), adminController.updateSchedule)
// router.patch('/events', jwtAuth('admin'), adminController.updateEvents)
// router.patch('/venues', jwtAuth('admin'), adminController.updateVenues)
// router.patch('/slots', jwtAuth('admin'), adminController.updateSlots)
// router.patch('/bookings', jwtAuth('admin'), adminController.updateBookings)


module.exports = router
