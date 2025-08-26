'use strict'

const schedulesData = [
  {
    club_id: 1,
    start_date: '2025-08-16',
    end_date: '2025-09-30',
    slot_duration: 20,
    slot_break: 0,
    booking_days: 7,
    status: 'closed',
    auto_rule_date: '2025-09-23'
  },
  {
    club_id: 2,
    start_date: '2025-08-16',
    end_date: '2025-09-30',
    slot_duration: 20,
    slot_break: 0,
    booking_days: 7,
    status: 'open',
    auto_rule_date: '2025-09-23'
  },
  {
    club_id: 3,
    start_date: '2025-06-01',
    end_date: '2025-07-31',
    slot_duration: 20,
    slot_break: 0,
    booking_days: 7,
    status: 'closed',
    auto_rule_date: '2025-07-23'
  },
  {
    club_id: 1,
    start_date: '2025-10-01',
    end_date: '2025-11-30',
    slot_duration: 20,
    slot_break: 0,
    booking_days: 7,
    status: 'draft',
    auto_rule_date: '2025-11-23'
  },
  {
    club_id: 3,
    start_date: '2025-08-01',
    end_date: '2025-09-30',
    slot_duration: 20,
    slot_break: 0,
    booking_days: 7,
    status: 'open',
    auto_rule_date: '2025-09-23'
  }
]

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('schedules', schedulesData)
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('schedules', null)
  }
}
