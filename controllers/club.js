// Models
const { Club, Venue } = require('../models')
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

    const safeClub = club.getSafeData()

    res.status(200).json({ message: 'Club retrieved successfully.', club: safeClub })
  })

  getAllClubs = asyncError(async (req, res) => {
    const clubs = await Club.findAll()

    const safeClubs = clubs.map(club => club.getSafeData())

    res.status(200).json({ message: 'All clubs retrieved successfully.', clubs: safeClubs })
  })

  createClub = asyncError(async (req, res) => {
    const { name, timeZone } = req.body

    // Step 1: Create the club
    const club = await Club.create({ name, timeZone })

    // Step 2: Get today's date (YYYY-MM-DD)
    const startDate = time.today(timeZone)

    // Step 3: Create the default schedule for this club
    const schedule = await club.createSchedule({ clubId: club.id, startDate })

    // Step 4: Create default venues for the schedule ()
    const venueData = Venue.default(6, schedule.id, 4)
    await Venue.bulkCreate(venueData)

    res.status(201).json({ message: 'Club created successfully with default schedule and venues.' })
  })
}

module.exports = new ClubController()
