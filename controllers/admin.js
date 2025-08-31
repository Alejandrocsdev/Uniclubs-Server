// Models
const { sequelize, Venue, Club, Rule, Plan } = require('../models')
// Middlewares
const { asyncError } = require('../middlewares')
// Errors
const CustomError = require('../errors/CustomError')
// Utilities
const { date } = require('../utils')

class AdminController {
  createVenues = asyncError(async (req, res) => {
    const { clubId } = req.params
    const { venues } = req.body

    const { user } = req
    const hasAccess = await user.hasClub(clubId)
    if (!hasAccess) throw new CustomError(403, 'No access to this club.')

    const club = await Club.findByPk(clubId)
    if (!club) throw new CustomError(404, 'Club not found.')

    const names = venues.map(venue => venue.name)
    const existing = await Venue.findAll({ where: { clubId, name: names }, attributes: ['name'] })
    if (existing.length) {
      const taken = existing.map(exist => exist.name)
      throw new CustomError(409, `Venue name(s) already exist: ${taken.join(', ')}`)
    }

    const rows = venues.map(venue => ({
      clubId: clubId,
      name: venue.name,
      playersLimit: venue.playersLimit,
      sportType: venue.sportType,
      active: venue.active
    }))

    const created = await Venue.bulkCreate(rows)

    res.status(201).json({ message: `Created ${created.length} venue(s).` })
  })

  createRules = asyncError(async (req, res) => {
    const { venueId } = req.params
    const { openTime, closeTime, slotDuration, slotBreak } = req.body
    const { user } = req

    const venue = await Venue.findByPk(venueId, { attributes: ['id', 'clubId'] })
    if (!venue) throw new CustomError(404, 'Venue not found.')

    const club = await Club.findByPk(venue.clubId, { attributes: ['id', 'timeZone'] })
    if (!club) throw new CustomError(404, 'Club not found.')

    const hasAccess = await user.hasClub(club.id)
    if (!hasAccess) throw new CustomError(403, 'No access to this club.')

    const startDate = date.today(club.timeZone)
    await Rule.create({ venueId, startDate, openTime, closeTime, slotDuration, slotBreak })

    res.status(201).json({ message: 'Rule created successfully.' })
  })

  createPlans = asyncError(async (req, res) => {
    const { clubId } = req.params
    const { code, name, durationDays, priceCents, currency } = req.body

    const { user } = req
    const hasAccess = await user.hasClub(clubId)
    if (!hasAccess) throw new CustomError(403, 'No access to this club.')

    await Plan.create({ clubId, code, name, durationDays, priceCents, currency })

    res.status(201).json({ message: 'Rule created successfully.' })
  })
}

module.exports = new AdminController()
