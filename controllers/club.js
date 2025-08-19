// Models
const { Club } = require('../models')
// Middlewares
const { asyncError } = require('../middlewares')
// Errors
const CustomError = require('../errors/CustomError')

class ClubController {
  getClubs = asyncError(async (req, res) => {
    const clubs = await Club.findAll()

    res.status(200).json({ message: 'All clubs retrieved successfully.', clubs })
  })

  getClub = asyncError(async (req, res) => {
    const { clubId } = req.params

    const club = await Club.findByPk(clubId)
    if (!club) throw new CustomError(404, 'Club not found.')

    res.status(200).json({ message: 'Club retrieved successfully.', club })
  })

  createClub = asyncError(async (req, res) => {
    const { name, timeZone } = req.body

    await Club.create({ name, timeZone })

    res.status(201).json({ message: 'Club created successfully.' })
  })
}

module.exports = new ClubController()
