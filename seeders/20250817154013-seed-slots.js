'use strict'

const slotsData = [
  { venue_id: 1, date: '2025-08-01', start_time: '09:00:00', end_time: '18:00:00', capacity: 0, status: 'open' },
]

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('slots', slotsData)
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('slots', null)
  }
}
