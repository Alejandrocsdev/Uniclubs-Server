// Models
const { Club } = require('../models')
// Middlewares
const { asyncError } = require('../middlewares')

class ClubController {
  getAllClubs = asyncError(async (req, res) => {
    const clubs = await Club.findAll()
    const { ts } = req.query

    const safeClubs = clubs.map(club => club.getSafeData({ ts }))

    res.status(200).json({ message: 'All clubs retrieved successfully.', clubs: safeClubs })
  })
}

module.exports = new ClubController()
