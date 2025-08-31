'use strict'

const clubsData = [
  { name: 'A', time_zone: 'Europe/Amsterdam', booking_days: 1, active: true },
  { name: 'B', time_zone: 'Asia/Taipei', booking_days: 2, active: true },
  { name: 'C', time_zone: 'America/Montevideo', booking_days: 3, active: true }
]

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('clubs', clubsData)
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('clubs', null)
  }
}
