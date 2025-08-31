const Joi = require('joi')

const requiredString = label => ({
  'string.base': `${label} must be a string`,
  'any.required': `${label} is required`,
  'string.empty': `${label} is required`
})

const username = () =>
  Joi.string()
    .trim()
    .min(4)
    .max(16)
    .required()
    .messages({
      ...requiredString('Username'),
      'string.min': 'Username must be at least 4 characters',
      'string.max': 'Username must most 16 characters'
    })

const password = () =>
  Joi.string()
    .trim()
    .min(8)
    .max(16)
    .pattern(/[a-z]/, 'lowercase letter')
    .pattern(/[A-Z]/, 'uppercase letter')
    .pattern(/[0-9]/, 'number')
    .required()
    .messages({
      ...requiredString('Password'),
      'string.min': 'Password must be at least 8 characters',
      'string.max': 'Password must be most 16 characters',
      'string.pattern.name': 'Password must include at least one {#name}'
    })

const email = () =>
  Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      ...requiredString('Email'),
      'string.email': 'Email must be valid'
    })
const token = () =>
  Joi.string()
    .trim()
    .required()
    .messages({
      ...requiredString('Token')
    })
    
const purpose = () =>
  Joi.string()
    .trim()
    .valid('sign-up:user', 'sign-up:admin', 'reset-password', 'recover-username')
    .required()
    .messages({
      ...requiredString('Purpose'),
      'any.only': 'Purpose must be one of: sign-up:user, sign-up:admin, reset-password, recover-username'
    })

const signUpUser = {
  body: Joi.object({
    username: username(),
    password: password(),
    email: email()
  })
}
const signUpAdmin = {
  body: Joi.object({
    username: username(),
    password: password(),
    email: email(),
    token: token()
  })
}
const emailOtp = {
  body: Joi.object({
    email: email(),
    purpose: purpose()
  })
}
const resetPassword = {
  body: Joi.object({
    password: password(),
    email: email()
  })
}
const recoverUsername = {
  body: Joi.object({
    email: email()
  })
}
const verifyToken = {
  params: Joi.object({
    token: token()
  })
}

module.exports = { signUpUser, signUpAdmin, emailOtp, resetPassword, recoverUsername, verifyToken }
