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
    .min(1)
    .max(30)
    .required()
    .messages({
      ...requiredString('Name'),
      'string.min': 'Name must be at least 1 character',
      'string.max': 'Name must be at most 30 characters'
    })

const playersLimit = () =>
  Joi.number()
    .integer()
    .required()
    .messages({
      ...requiredNumber('Players limit'),
      'number.integer': 'Players limit must be an integer'
    })

const SPORT_ALLOWED = { badminton: new Set([2, 4]) }
const SPORT_TYPES = Object.keys(SPORT_ALLOWED)

const sportType = () =>
  Joi.string()
    .trim()
    .valid(...SPORT_TYPES)
    .required()
    .messages({
      ...requiredString('Sport type'),
      'any.only': `Sport type must be one of: ${SPORT_TYPES.join(', ')}`
    })

const TIME_24H = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/

const time = (label = 'Time') =>
  Joi.string()
    .trim()
    .required()
    .pattern(TIME_24H, 'HH:MM:SS')
    .messages({
      'string.base': `${label} must be a string`,
      'any.required': `${label} is required`,
      'string.empty': `${label} is required`,
      'string.pattern.name': `${label} must be in HH:MM:SS (24h) format`
    })

const slotDuration = () =>
  Joi.number().integer().min(10).max(60).optional().messages({
    'number.base': 'Slot duration must be a number',
    'number.integer': 'Slot duration must be an integer',
    'number.min': 'Slot duration must be at least 10',
    'number.max': 'Slot duration must be at most 60'
  })

const slotBreak = () =>
  Joi.number().integer().min(0).max(30).optional().messages({
    'number.base': 'Slot break must be a number',
    'number.integer': 'Slot break must be an integer',
    'number.min': 'Slot break must be at least 0',
    'number.max': 'Slot break must be at most 30'
  })

const code = () =>
  Joi.string()
    .trim()
    .min(1)
    .max(4)
    .required()
    .messages({
      ...requiredString('Code'),
      'string.min': 'Name must be at least 1 character',
      'string.max': 'Name must be at most 4 characters'
    })

const durationDays = () =>
  Joi.number().integer().min(1).max(365).optional().messages({
    'number.base': 'Duration days must be a number',
    'number.integer': 'Duration days must be an integer',
    'number.min': 'Duration days must be at least 1',
    'number.max': 'Duration days must be at most 365'
  })

const MIN_PRICE_CENTS = 0
const MAX_PRICE_CENTS = 99_999_999

const priceCents = () =>
  Joi.number()
    .integer()
    .min(MIN_PRICE_CENTS)
    .max(MAX_PRICE_CENTS)
    .required()
    .messages({
      'number.base': 'Price (cents) must be a number',
      'number.integer': 'Price (cents) must be an integer',
      'any.required': 'Price (cents) is required',
      'number.min': `Price (cents) must be at least ${MIN_PRICE_CENTS}`,
      'number.max': `Price (cents) must be at most ${MAX_PRICE_CENTS}`
    })

const currency = () =>
  Joi.string()
    .trim()
    .uppercase()
    .length(3)
    .required()
    .custom((value, helpers) => {
      if (new Set(Intl.supportedValuesOf('currency')).has(value)) return value
      return helpers.error('string.currency')
    })
    .messages({
      'string.base': 'Currency must be a string',
      'string.length': 'Currency must be a 3-letter code',
      'any.required': 'Currency is required',
      'string.currency': 'Currency must be a valid ISO 4217 code'
    })

const status = (mode = 'put') => {
  const allowed = mode === 'put' ? ['draft', 'enabled', 'disabled'] : ['enabled', 'disabled']

  return Joi.string()
    .trim()
    .valid(...allowed)
    .required()
    .messages({
      ...requiredString('Status'),
      'any.only': `Status must be one of: ${allowed.join(', ')}`
    })
}

const id = () =>
  Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      ...requiredNumber('ID'),
      'number.integer': 'ID must be an integer',
      'number.min': 'ID must be at least 1'
    })

const venueItem = Joi.object({
  name: name(),
  sportType: sportType(),
  playersLimit: playersLimit()
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

const createRule = {
  body: Joi.object({
    openTime: time(),
    closeTime: time(),
    slotDuration: slotDuration(),
    slotBreak: slotBreak()
  })
}

const createPlan = {
  body: Joi.object({
    code: code(),
    name: name(),
    durationDays: durationDays(),
    priceCents: priceCents(),
    currency: currency()
  })
}

const updatePlan = {
  body: Joi.object({
    code: code(),
    name: name(),
    durationDays: durationDays(),
    priceCents: priceCents(),
    currency: currency(),
    status: status('put')
  })
}

const updatePlanStatus = {
  body: Joi.object({
    status: status('patch')
  })
}

const addMember = {
  body: Joi.object({
    planId: id()
  })
}

module.exports = { createVenues, createRule, createPlan, updatePlan, updatePlanStatus, addMember }
