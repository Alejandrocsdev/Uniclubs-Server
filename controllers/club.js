// Models
const { Club, Schedule, Venue, Slot } = require('../models')
// Middlewares
const { asyncError } = require('../middlewares')
// Errors
const CustomError = require('../errors/CustomError')
// Utilities
const { time } = require('../utils')

class ClubController {
  getClub = asyncError(async (req, res) => {
    const { clubId } = req.params

    const club = await Club.findByPk(clubId)

    if (!club) throw new CustomError(404, 'Club not found.')

    res.status(200).json({ message: 'Club retrieved successfully.', club })
  })

  getAllClubs = asyncError(async (req, res) => {
    const clubs = await Club.findAll()

    res.status(200).json({ message: 'All clubs retrieved successfully.', clubs })
  })

  createClub = asyncError(async (req, res) => {
    const { name, timeZone } = req.body

    // Step 1: Create the club
    const club = await Club.create({ name, timeZone })

    // Step 2: Get today's date (YYYY-MM-DD)
    const startDate = time.today(timeZone)

    // Step 3: Create the default schedule for this club
    const schedule = await club.createSchedule({ clubId: club.id, startDate })
    const { openTime, closeTime, slotDuration, slotBreak } = schedule

    // Step 4: Create default venues for the club
    const venuesData = Venue.default(club.id)
    await Venue.bulkCreate(venuesData)

    // Step 5: Create default slots for the
    const venues = await Venue.findAll({ where: { clubId: club.id } })
    const baseSlots = Slot.template(openTime, closeTime, slotDuration, slotBreak)
    const slotsData = venues.flatMap(venue => baseSlots.map(slot => ({ ...slot, venueId: venue.id })))
    await Slot.bulkCreate(slotsData)

    res.status(201).json({ message: 'Club created successfully with default schedule and venues.' })
  })

  createSchedule = asyncError(async (req, res) => {
    const { clubId } = req.params

    const club = await Club.findByPk(clubId)
    if (!club) throw new CustomError(404, 'Club not found.')

    const schedule = await Schedule.findOne({ where: { clubId } })
    if (!schedule) throw new CustomError(404, 'Schedule not found.')

    const { openTime, closeTime, slotDuration, slotBreak } = req.body

    console.log(schedule.toJSON())

    res.status(201).json({ message: 'Schedule created successfully.' })
  })
}

module.exports = new ClubController()
