const Joi = require('joi')

const requiredString = label => ({
  'string.base': `${label} must be a string`,
  'any.required': `${label} is required`,
  'string.empty': `${label} is required`
})

const requiredNumber = label => ({
  'number.base': `${label} must be a number`,
  'any.required': `${label} is required`
})

const name = () =>
  Joi.string()
    .trim()
    .min(4)
    .max(20)
    .required()
    .messages({
      ...requiredString('Username'),
      'string.min': 'Name must be at least 4 characters',
      'string.max': 'Name must most 20 characters'
    })

const timeZone = () =>
  Joi.string()
    .trim()
    .required()
    .custom((value, helpers) => {
      if (new Set(Intl.supportedValuesOf('timeZone')).has(value)) return value
      return helpers.error('string.timeZone')
    })
    .messages({
      ...requiredString('Time zone'),
      'string.timeZone': 'Time zone must be a valid IANA time zone'
    })

const bookingDays = () =>
  Joi.number().integer().min(1).max(7).optional().messages({
    'number.base': 'Booking days must be a number',
    'number.integer': 'Booking days must be an integer',
    'number.min': 'Booking days must be at least 1',
    'number.max': 'Booking days must be at most 7'
  })

const id = () =>
  Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      ...requiredNumber('Club id'),
      'number.integer': 'Club id must be an integer',
      'number.min': 'Club id must be at least 1'
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

const uid = () =>
  Joi.string()
    .trim()
    .pattern(/^[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{8}$/)
    .required()
    .messages({
      ...requiredString('UID'),
      'string.pattern.base': 'UID must be 8 characters using digits 2-9 and uppercase letters A-Z (excluding I and O)'
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

const createClub = {
  body: Joi.object({
    name: name(),
    timeZone: timeZone(),
    bookingDays: bookingDays()
  })
}
const inviteAdmin = {
  body: Joi.object({
    clubId: id(),
    email: email()
  })
}
const makeAdmin = {
  body: Joi.object({
    uid: uid(),
    username: username(),
    email: email(),
    clubId: id()
  })
}

module.exports = { createClub, inviteAdmin, makeAdmin }
