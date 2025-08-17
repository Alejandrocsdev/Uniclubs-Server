// Errors
const CustomError = require('../errors/CustomError')

class Time {
  today(timeZone) {
    try {
      const options = { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }
      const parts = new Intl.DateTimeFormat('default', options).formatToParts(new Date())
      const get = time => parts.find(part => part.type === time).value
      return `${get('year')}-${get('month')}-${get('day')}`
    } catch (error) {
      throw new CustomError(500, 'Today date generation failed.')
    }
  }

  toMinutes(HHMMSS) {
    try {
      const [hh, mm] = HHMMSS.split(':')
      return Number(hh) * 60 + Number(mm)
    } catch (error) {
      throw new CustomError(500, `Convert time string "${HHMMSS}" to minutes failed.`)
    }
  }

  toHHMMSS(minutes) {
    try {
      const hh = Math.floor(minutes / 60) % 24
      const mm = minutes % 60
      const pad = n => String(n).padStart(2, '0')
      return `${pad(hh)}:${pad(mm)}:00`
    } catch (error) {
      throw new CustomError(500, `Convert minutes "${minutes}" to HH:MM:SS format failed.`)
    }
  }
}

module.exports = new Time()
