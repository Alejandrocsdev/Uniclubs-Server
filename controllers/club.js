// Models
const { Club } = require('../models')
// Middlewares
const { asyncError } = require('../middlewares')
// Errors
const CustomError = require('../errors/CustomError')

class ClubController {
  getClubs = asyncError(async (req, res) => {
    const clubs = await Club.findAll()

    const safeClubs = clubs.map(club => club.getSafeData())

    res.status(200).json({ message: 'All clubs retrieved successfully.', clubs: safeClubs })
  })

  getClub = asyncError(async (req, res) => {
    const { clubId } = req.params

    const club = await Club.findByPk(clubId)
    if (!club) throw new CustomError(404, 'Club not found.')

    res.status(200).json({ message: 'Club retrieved successfully.', club: club.getSafeData() })
  })
}

module.exports = new ClubController()
