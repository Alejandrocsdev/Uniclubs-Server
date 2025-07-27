const { Router } = require('express')
const router = Router()

const user = require('./user')
const auth = require('./auth')
const club = require('./club')

router.use('/user', user)
router.use('/auth', auth)
router.use('/club', club)

module.exports = router
