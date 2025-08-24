const { Router } = require('express')
const router = Router()

const auth = require('./auth')
const users = require('./users')
const clubs = require('./clubs')
const owner = require('./owner')

router.use('/auth', auth)
router.use('/users', users)
router.use('/clubs', clubs)
router.use('/owner', owner)

module.exports = router
