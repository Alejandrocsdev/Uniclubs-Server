const { Router } = require('express')
const router = Router()

const auth = require('./auth')
const users = require('./users')
const clubs = require('./clubs')

router.use('/auth', auth)
router.use('/users', users)
router.use('/clubs', clubs)

module.exports = router
