'use strict'

const programsData = [
  { user_id: 7, club_id: 1 },
  { user_id: 8, club_id: 2 },
  { user_id: 9, club_id: 2 },
  { user_id: 10, club_id: 2 },
  { user_id: 10, club_id: 3 }
]

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('programs', programsData)
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('programs', null)
  }
}
