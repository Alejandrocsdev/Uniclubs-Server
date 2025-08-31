// Errors
const CustomError = require('../errors/CustomError')

const validate = (schemas = {}) => {
  const options = {
    abortEarly: true,
    stripUnknown: { objects: true },
    convert: false
  }

  return (req, res, next) => {
    for (const key of ['params', 'query', 'body']) {
      const schema = schemas[key]
      if (!schema) continue

      const { error } = schema.validate(req[key], options)
      if (error) {
        const message = error.details[0].message
        throw new CustomError(400, 'Invalid request', message)
      }
    }
    next()
  }
}

module.exports = validate
