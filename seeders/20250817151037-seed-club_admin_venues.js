'use strict'

const programVenuesData = [
  { program_id: 1, venue_id: 1 },
  { program_id: 1, venue_id: 2 },
  { program_id: 1, venue_id: 3 },
  { program_id: 1, venue_id: 4 },
  { program_id: 1, venue_id: 5 },
  { program_id: 1, venue_id: 6 },
  { program_id: 2, venue_id: 7 },
  { program_id: 2, venue_id: 8 },
  { program_id: 2, venue_id: 9 },
  { program_id: 2, venue_id: 10 },
  { program_id: 2, venue_id: 11 },
  { program_id: 2, venue_id: 12 },
  { program_id: 3, venue_id: 13 },
  { program_id: 3, venue_id: 14 },
  { program_id: 3, venue_id: 15 },
  { program_id: 3, venue_id: 16 },
  { program_id: 3, venue_id: 17 },
  { program_id: 3, venue_id: 18 },
  { program_id: 3, venue_id: 19 },
  { program_id: 3, venue_id: 20 },
  { program_id: 3, venue_id: 21 },
  { program_id: 4, venue_id: 22 },
  { program_id: 4, venue_id: 23 },
  { program_id: 4, venue_id: 24 },
  { program_id: 4, venue_id: 25 },
  { program_id: 5, venue_id: 26 },
  { program_id: 5, venue_id: 27 },
  { program_id: 5, venue_id: 28 },
  { program_id: 5, venue_id: 29 }
]

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('program_venues', programVenuesData)
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('program_venues', null)
  }
}
