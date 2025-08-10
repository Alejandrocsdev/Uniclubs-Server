'use strict'

const bookingsData = [
  { user_id: 1, club_id: 1, venue_id: 1, date: '2025-08-09', start_time: '11:00:00', end_time: '11:20:00', status: 'confirmed' },
  { user_id: 2, club_id: 1, venue_id: 1, date: '2025-08-09', start_time: '12:20:00', end_time: '12:40:00', status: 'confirmed' },
  { user_id: 3, club_id: 1, venue_id: 2, date: '2025-08-09', start_time: '13:00:00', end_time: '13:20:00', status: 'confirmed' },
  { user_id: 4, club_id: 1, venue_id: 3, date: '2025-08-09', start_time: '14:40:00', end_time: '15:00:00', status: 'confirmed' },
  { user_id: 4, club_id: 1, venue_id: 4, date: '2025-08-09', start_time: '15:00:00', end_time: '15:20:00', status: 'confirmed' },
  { user_id: 1, club_id: 2, venue_id: 7, date: '2025-08-09', start_time: '11:00:00', end_time: '11:15:00', status: 'confirmed' },
  { user_id: 2, club_id: 2, venue_id: 8, date: '2025-08-09', start_time: '12:15:00', end_time: '12:30:00', status: 'confirmed' },
  { user_id: 3, club_id: 2, venue_id: 10, date: '2025-08-09', start_time: '13:00:00', end_time: '13:15:00', status: 'confirmed' },
  { user_id: 4, club_id: 2, venue_id: 13, date: '2025-08-09', start_time: '14:45:00', end_time: '15:00:00', status: 'confirmed' },
  { user_id: 4, club_id: 2, venue_id: 13, date: '2025-08-09', start_time: '15:00:00', end_time: '15:15:00', status: 'confirmed' },
  { user_id: 1, club_id: 3, venue_id: 14, date: '2025-08-09', start_time: '11:00:00', end_time: '11:30:00', status: 'confirmed' },
  { user_id: 2, club_id: 3, venue_id: 15, date: '2025-08-09', start_time: '12:30:00', end_time: '13:00:00', status: 'confirmed' },
  { user_id: 3, club_id: 3, venue_id: 17, date: '2025-08-09', start_time: '13:00:00', end_time: '13:30:00', status: 'confirmed' },
  { user_id: 4, club_id: 3, venue_id: 20, date: '2025-08-09', start_time: '14:30:00', end_time: '15:00:00', status: 'confirmed' },
  { user_id: 4, club_id: 3, venue_id: 21, date: '2025-08-09', start_time: '15:00:00', end_time: '15:30:00', status: 'confirmed' }
]

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('bookings', bookingsData)
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('bookings', null)
  }
}
