'use strict'

const MembershipsData = [
  { user_id: 1, plan_id: 3, start_date: '2025-08-10', end_date: '2025-09-09', status: 'active' },
  { user_id: 2, plan_id: 2, start_date: '2025-07-15', end_date: '2025-09-13', status: 'active' },
  { user_id: 3, plan_id: 2, start_date: '2025-08-01', end_date: '2025-08-31', status: 'active' },
  { user_id: 3, plan_id: 3, start_date: '2025-05-01', end_date: '2025-06-30', status: 'expired' },
  { user_id: 4, plan_id: 2, start_date: '2025-08-10', end_date: '2025-09-09', status: 'active' },
  { user_id: 5, plan_id: 1, start_date: '2025-02-01', end_date: '2025-02-28', status: 'expired' },
  { user_id: 6, plan_id: 2, start_date: '2025-08-05', end_date: '2025-09-04', status: 'active' },
  { user_id: 6, plan_id: 3, start_date: '2025-03-01', end_date: '2025-04-30', status: 'expired' }
]

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('memberships', MembershipsData)
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('memberships', null)
  }
}
