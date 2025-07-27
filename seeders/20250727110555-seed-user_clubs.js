'use strict'

const userClubsData = [
  { user_id: 3, club_id: 1 },
  { user_id: 4, club_id: 1 },
  { user_id: 4, club_id: 2 }
]

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('user_clubs', userClubsData)
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('user_clubs', null)
  }
}
