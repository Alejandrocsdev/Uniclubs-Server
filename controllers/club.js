// Models
const { Club, Venue } = require('../models')
// Middlewares
const { asyncError } = require('../middlewares')

class ClubController {
  getAllClubs = asyncError(async (req, res) => {
    const clubs = await Club.findAll()

    const safeClubs = clubs.map(club => club.getSafeData())

    res.status(200).json({ message: 'All clubs retrieved successfully.', clubs: safeClubs })
  })

  createClub = asyncError(async (req, res) => {
    const { name } = req.body

    // Step 1: Create the club
    const club = await Club.create({ name })

    // Step 2: Create the default schedule for this club
    const schedule = await club.createSchedule({ clubId: club.id })

    // Step 3: Create 6 default venues for the schedule
    const venueData = Array.from({ length: 6 }, (_, i) => ({
      scheduleId: schedule.id,
      name: `Venue ${i + 1}`,
      maxPlayers: 4
    }))
    await Venue.bulkCreate(venueData)

    res.status(201).json({ message: 'Club created successfully with default schedule and venues.' })
  })
}

module.exports = new ClubController()
