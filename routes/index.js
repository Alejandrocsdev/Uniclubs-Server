const { Router } = require('express')
const router = Router()

const user = require('./user')
const auth = require('./auth')
const recovery = require('./recovery')

router.use('/user', user)
router.use('/auth', auth)
router.use('/recovery', recovery)

module.exports = router
