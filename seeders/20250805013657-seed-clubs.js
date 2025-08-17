'use strict'

const clubsData = [
  { name: 'A', time_zone: 'Europe/Amsterdam' },
  { name: 'B', time_zone: 'Asia/Taipei' },
  { name: 'C', time_zone: 'America/Montevideo' }
]

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('clubs', clubsData)
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('clubs', null)
  }
}
