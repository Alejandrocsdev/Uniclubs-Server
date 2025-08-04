'use strict'

const clubsData = [{ name: 'A' }, { name: 'B' }, { name: 'C' }]

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('clubs', clubsData)
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('clubs', null)
  }
}
