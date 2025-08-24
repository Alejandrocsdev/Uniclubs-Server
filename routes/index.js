const { Router } = require('express')
const router = Router()

const auth = require('./auth')
const users = require('./users')
const clubs = require('./clubs')
const owner = require('./owner')
const admin = require('./admin')

router.use('/auth', auth)
router.use('/users', users)
router.use('/clubs', clubs)
router.use('/owner', owner)
router.use('/admin', admin)

module.exports = router
