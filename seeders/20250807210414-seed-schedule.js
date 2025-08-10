'use strict'

const schedulesData = [
  { club_id: '1', start_date: '2025-08-01', open_time: '09:00:00', close_time: '18:00:00', slot_duration: 20, slot_break: 5 },
  { club_id: '2', start_date: '2025-08-07', open_time: '10:00:00', close_time: '19:00:00', slot_duration: 15, slot_break: 0 },
  { club_id: '3', start_date: '2025-08-09', open_time: '11:00:00', close_time: '20:00:00', slot_duration: 30 }
]

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('schedules', schedulesData)
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('schedules', null)
  }
}
