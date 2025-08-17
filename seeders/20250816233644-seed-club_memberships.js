'use strict'

const clubMembershipsData = [
  { user_id: 1, club_admin_id: 3, start_date: '2025-08-10', end_date: '2025-09-09', status: 'active' },
  { user_id: 2, club_admin_id: 2, start_date: '2025-07-15', end_date: '2025-09-13', status: 'active' },
  { user_id: 2, club_admin_id: 4, start_date: '2025-08-01', end_date: '2025-09-30', status: 'active' },
  { user_id: 3, club_admin_id: 2, start_date: '2025-08-01', end_date: '2025-08-31', status: 'active' },
  { user_id: 3, club_admin_id: 3, start_date: '2025-05-01', end_date: '2025-06-30', status: 'expired' },
  { user_id: 4, club_admin_id: 2, start_date: '2025-08-10', end_date: '2025-09-09', status: 'active' },
  { user_id: 4, club_admin_id: 5, start_date: '2025-07-01', end_date: '2025-12-28', status: 'active' },
  { user_id: 5, club_admin_id: 1, start_date: '2025-02-01', end_date: '2025-02-28', status: 'expired' },
  { user_id: 5, club_admin_id: 5, start_date: '2025-08-01', end_date: '2025-10-30', status: 'active' },
  { user_id: 6, club_admin_id: 2, start_date: '2025-08-05', end_date: '2025-09-04', status: 'active' },
  { user_id: 6, club_admin_id: 3, start_date: '2025-03-01', end_date: '2025-04-30', status: 'expired' },
  { user_id: 6, club_admin_id: 4, start_date: '2025-07-20', end_date: '2025-08-19', status: 'active' }
]

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('club_memberships', clubMembershipsData)
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('club_memberships', null)
  }
}
