'use strict'

const clubAdminVenuesData = [
  { club_admin_id: 1, venue_id: 1 },
  { club_admin_id: 1, venue_id: 2 },
  { club_admin_id: 1, venue_id: 3 },
  { club_admin_id: 1, venue_id: 4 },
  { club_admin_id: 1, venue_id: 5 },
  { club_admin_id: 1, venue_id: 6 },
  { club_admin_id: 2, venue_id: 7 },
  { club_admin_id: 2, venue_id: 8 },
  { club_admin_id: 2, venue_id: 9 },
  { club_admin_id: 2, venue_id: 10 },
  { club_admin_id: 2, venue_id: 11 },
  { club_admin_id: 2, venue_id: 12 },
  { club_admin_id: 3, venue_id: 13 },
  { club_admin_id: 3, venue_id: 14 },
  { club_admin_id: 3, venue_id: 15 },
  { club_admin_id: 3, venue_id: 16 },
  { club_admin_id: 3, venue_id: 17 },
  { club_admin_id: 3, venue_id: 18 },
  { club_admin_id: 3, venue_id: 19 },
  { club_admin_id: 3, venue_id: 20 },
  { club_admin_id: 3, venue_id: 21 },
  { club_admin_id: 4, venue_id: 22 },
  { club_admin_id: 4, venue_id: 23 },
  { club_admin_id: 4, venue_id: 24 },
  { club_admin_id: 4, venue_id: 25 },
  { club_admin_id: 5, venue_id: 26 },
  { club_admin_id: 5, venue_id: 27 },
  { club_admin_id: 5, venue_id: 28 },
  { club_admin_id: 5, venue_id: 29 }
]

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('club_admin_venues', clubAdminVenuesData)
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('club_admin_venues', null)
  }
}
