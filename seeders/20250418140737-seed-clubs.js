'use strict'

const clubsData = [{ user_id: 3, name: 'A' }, { user_id: 4, name: 'B' }]

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('clubs', clubsData)
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('clubs', null)
  }
}
