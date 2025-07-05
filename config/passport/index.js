// Libraries
const passport = require('passport')

// Strategy
const localStrategy = require('./local')

// Use Strategy
passport.use('local', localStrategy)

// Authentication
const signInAuth = passport.authenticate('local', { session: false })

module.exports = { signInAuth }
