const Joi = require('joi')

const requiredString = label => ({
  'string.base': `${label} must be a string`,
  'any.required': `${label} is required`,
  'string.empty': `${label} is required`
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

const updatePassword = {
  body: Joi.object({
    password: password(),
    newPassword: password()
  })
}

module.exports = { updatePassword }
