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

const requiredBoolean = label => ({
  'boolean.base': `${label} must be a boolean`,
  'any.required': `${label} is required`
})

const SPORT_ALLOWED = { badminton: new Set([2, 4]) }
const SPORT_TYPES = Object.keys(SPORT_ALLOWED)

const name = () =>
  Joi.string()
    .trim()
    .min(1)
    .max(20)
    .required()
    .messages({
      ...requiredString('Name'),
      'string.min': 'Name must be at least 1 character',
      'string.max': 'Name must be at most 20 characters'
    })

const playersLimit = () =>
  Joi.number()
    .integer()
    .required()
    .messages({
      ...requiredNumber('Players limit'),
      'number.integer': 'Players limit must be an integer'
    })

const sportType = () =>
  Joi.string()
    .trim()
    .valid(...SPORT_TYPES)
    .required()
    .messages({
      ...requiredString('Sport type'),
      'any.only': `Sport type must be one of: ${SPORT_TYPES.join(', ')}`
    })

const active = () =>
  Joi.boolean()
    .required()
    .strict()
    .messages({
      ...requiredBoolean('Active')
    })

const slotDuration = () =>
  Joi.number().integer().min(10).max(60).optional().messages({
    'number.base': 'Slot duration must be a number',
    'number.integer': 'Booking days must be an integer',
    'number.min': 'Booking days must be at least 10',
    'number.max': 'Booking days must be at most 60'
  })

const slotBreak = () =>
  Joi.number().integer().min(5).max(30).optional().messages({
    'number.base': 'Booking days must be a number',
    'number.integer': 'Booking days must be an integer',
    'number.min': 'Booking days must be at least 5',
    'number.max': 'Booking days must be at most 30'
  })

const venueItem = Joi.object({
  name: name(),
  sportType: sportType(),
  playersLimit: playersLimit(),
  active: active()
})
  .custom((venue, helpers) => {
    const allowedSet = SPORT_ALLOWED[venue.sportType]
    if (allowedSet && !allowedSet.has(venue.playersLimit)) {
      return helpers.error('any.custom', {
        custom: `playersLimit for ${venue.sportType} must be one of: ${[...allowedSet].join(', ')}`
      })
    }
    return venue
  }, 'sport-specific allowed players check')
  .messages({ 'any.custom': '{{#custom}}' })
  .unknown(false)

const createVenues = {
  body: Joi.object({
    venues: Joi.array().items(venueItem).min(1).max(20).unique('name').required().messages({
      'array.base': 'Venues must be an array',
      'array.min': 'Venues must contain at least 1 item',
      'array.max': 'Venues must contain at most 20 items',
      'any.required': 'Venues is required',
      'array.unique': 'Venue names must be unique'
    })
  })
}

const createSchedule = {
  body: Joi.object({
    slotDuration: slotDuration(),
    slotBreak: slotBreak()
  })
}

module.exports = { createVenues, createSchedule }
