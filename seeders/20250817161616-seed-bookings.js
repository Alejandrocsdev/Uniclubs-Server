'use strict'

const bookingsData = [
  { slot_id: 1, size: 0, status: 'open' },
]

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('bookings', bookingsData)
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('bookings', null)
  }
}
