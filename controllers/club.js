// Models
const { Club, User } = require('../models')
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

    await Club.create({ name })

    res.status(200).json({ message: 'Club created successfully.' })
  })
}

module.exports = new ClubController()
