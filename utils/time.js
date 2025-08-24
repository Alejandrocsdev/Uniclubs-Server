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

  // YYYY-MM-DD (date) to YYYY-MM-DDTHH:MM:SS.000Z (UTC)
  dateToUTC(date) {
    const [year, month, day] = date.split('-').map(Number)
    return new Date(Date.UTC(year, month - 1, day))
  }

  // YYYY-MM-DDTHH:MM:SS.000Z (UTC) to YYYY-MM-DD (date)
  UTCtoDate(UTC) {
    const year = UTC.getUTCFullYear()
    const month = String(UTC.getUTCMonth() + 1).padStart(2, '0')
    const day = String(UTC.getUTCDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  addDays(date, days) {
    try {
      const UTC = this.dateToUTC(date)
      UTC.setUTCDate(UTC.getUTCDate() + Number(days))
      return this.UTCtoDate(UTC)
    } catch {
      throw new CustomError(500, `Add ${days} days to "${date}" failed.`)
    }
  }

  addMonths(date, months) {
    try {
      const [year, month, day] = date.split('-').map(Number)
      // Move to the 1st day of the current month in UTC (prevents overflow)
      const first = new Date(Date.UTC(year, month - 1, 1))
      first.setUTCMonth(first.getUTCMonth() + Number(months))
      const last = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 1, 0))
      // Use the smaller of the two to prevent rollover
      const targetDay = Math.min(day, last.getUTCDate())
      const target = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth(), targetDay))
      return this.UTCtoDate(target)
    } catch {
      throw new CustomError(500, `Add ${months} months to "${date}" failed.`)
    }
  }

  startOfMonth(date) {
    const [year, month] = date.split('-').map(Number)
    return this.UTCtoDate(new Date(Date.UTC(year, month - 1, 1)))
  }
  endOfMonth(date) {
    const [year, month] = date.split('-').map(Number)
    return this.UTCtoDate(new Date(Date.UTC(year, month, 0)))
  }

  scheduleDates(startDate) {
    const nextRuleStartDate = this.addMonths(this.startOfMonth(startDate), 1)
    const endDate = this.addMonths(this.endOfMonth(startDate), 2)
    const reminderStartDate = this.addDays(endDate, -14)
    const autoRuleDate = this.addDays(endDate, -7)
    return { endDate, nextRuleStartDate, reminderStartDate, autoRuleDate }
  }
}

module.exports = new Time()
