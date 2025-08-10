// Errors
const CustomError = require('../errors/CustomError')

class Time {
  today(timeZone) {
    try {
      const parts = new Intl.DateTimeFormat('default', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).formatToParts(new Date())

      const get = time => parts.find(part => part.type === time).value

      return `${get('year')}-${get('month')}-${get('day')}`
    } catch (error) {
      throw new CustomError(500, 'Today date generation failed.')
    }
  }
}

module.exports = new Time()
