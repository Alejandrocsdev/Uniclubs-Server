// Models
const { sequelize, User, Venue, Club, Rule, Plan, Membership } = require('../models')
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

  createRule = asyncError(async (req, res) => {
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

  createPlan = asyncError(async (req, res) => {
    const { clubId } = req.params
    const { code, name, durationDays, priceCents, currency } = req.body

    const { user } = req
    const hasAccess = await user.hasClub(clubId)
    if (!hasAccess) throw new CustomError(403, 'No access to this club.')

    await Plan.create({ clubId, code, name, durationDays, priceCents, currency })

    res.status(201).json({ message: 'Rule created successfully.' })
  })

  updatePlan = asyncError(async (req, res) => {
    const { planId } = req.params
    const { code, name, durationDays, priceCents, currency, status } = req.body

    const plan = await Plan.findByPk(planId)
    if (!plan) throw new CustomError(404, 'Plan not found.')

    const { user } = req
    const hasAccess = await user.hasClub(plan.clubId)
    if (!hasAccess) throw new CustomError(403, 'No access to this club.')

    if (plan.status !== 'draft') {
      throw new CustomError(400, "Plan details can't be updated once enabled. Use the status endpoint instead.")
    }
    await plan.update({ code, name, durationDays, priceCents, currency, status })

    res.status(200).json({ message: 'Plan updated successfully.' })
  })

  updatePlanStatus = asyncError(async (req, res) => {
    const { planId } = req.params
    const { status } = req.body

    const plan = await Plan.findByPk(planId)
    if (!plan) throw new CustomError(404, 'Plan not found.')

    const { user } = req
    const hasAccess = await user.hasClub(plan.clubId)
    if (!hasAccess) throw new CustomError(403, 'No access to this club.')

    if (plan.status === 'draft') {
      throw new CustomError(400, "Draft plans can only transition to 'enabled' via the full update endpoint.")
    }

    if (plan.status === status) {
      return res.status(200).json({ message: 'No changes.' })
    }

    await plan.update({ status })
    return res.status(200).json({ message: 'Plan status updated successfully.' })
  })

  getActivePlans = asyncError(async (req, res) => {
    const { user } = req

    const clubs = user.clubs.map(club => ({
      id: club.id,
      name: club.name,
      plans: club.plans
        .filter(plan => plan.status === 'enabled')
        .map(plan => ({
          id: plan.id,
          code: plan.code,
          name: plan.name,
          status: plan.status
        }))
    }))

    res.status(200).json({ message: 'Admin clubs retrieved successfully.', clubs })
  })

  addMember = asyncError(async (req, res) => {
    const { userId } = req.params
    const { planId } = req.body
    const admin = req.user

    const plan = await Plan.findByPk(planId, {
      include: [{ association: 'club', attributes: ['timeZone'] }]
    })
    if (!plan) throw new CustomError(404, 'Plan not found.')
    if (plan.status !== 'enabled') throw new CustomError(400, 'Plan is not enabled.')

    const hasAccess = await admin.hasClub(plan.clubId)
    if (!hasAccess) throw new CustomError(403, 'No access to this club.')

    const member = await User.findByPk(userId)
    if (!member) throw new CustomError(404, 'User not found.')

    const existing = await Membership.findOne({ where: { userId: member.id, planId: plan.id } })
    if (existing) throw new CustomError(409, 'User already has an membership for this plan.')

    const starts = date.today()
    const ends = date.addDays(starts, plan.durationDays - 1)

    await Membership.create({
      userId: member.id,
      planId: plan.id,
      startDate: starts,
      endDate: ends
    })

    res.status(200).json({ message: 'User added membership successfully.' })
  })
}

module.exports = new AdminController()
