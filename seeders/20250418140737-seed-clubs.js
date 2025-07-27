'use strict'

const clubsData = [
  { name: 'A', open_time: '08:00:00', close_time: '18:00:00', slot_duration: 20 },
  { name: 'B', open_time: '09:00:00', close_time: '19:00:00', slot_duration: 30 }
]

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('clubs', clubsData)
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('clubs', null)
  }
}
