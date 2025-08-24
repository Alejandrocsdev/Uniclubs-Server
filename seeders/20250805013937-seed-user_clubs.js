'use strict'

const userClubsData = [
  { user_id: 7, club_id: 1 },
  { user_id: 8, club_id: 2 },
  { user_id: 9, club_id: 2 },
  { user_id: 10, club_id: 2 },
  { user_id: 10, club_id: 3 }
]

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('user_clubs', userClubsData)
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('user_clubs', null)
  }
}
