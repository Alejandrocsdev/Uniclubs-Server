'use strict'

const scheduleRulesData = [
  {
    program_id: 1,
    start_date: '2025-08-16',
    end_date: '2025-09-30',
    slot_duration: 20,
    slot_break: 0,
    booking_days: 7,
    status: 'closed',
    next_rule_start_date: '2025-09-01',
    has_next_rule: true,
    reminder_start_date: '2025-09-16',
    auto_rule_date: '2025-09-23'
  },
  {
    program_id: 2,
    start_date: '2025-08-16',
    end_date: '2025-09-30',
    slot_duration: 20,
    slot_break: 0,
    booking_days: 7,
    status: 'open',
    next_rule_start_date: '2025-09-01',
    has_next_rule: true,
    reminder_start_date: '2025-09-16',
    auto_rule_date: '2025-09-23'
  },
  {
    program_id: 3,
    start_date: '2025-06-01',
    end_date: '2025-07-31',
    slot_duration: 20,
    slot_break: 0,
    booking_days: 7,
    status: 'closed',
    next_rule_start_date: '2025-08-01',
    has_next_rule: true,
    reminder_start_date: '2025-07-16',
    auto_rule_date: '2025-07-23'
  },
  {
    program_id: 4,
    start_date: '2025-08-16',
    end_date: '2025-09-30',
    slot_duration: 20,
    slot_break: 0,
    booking_days: 7,
    status: 'closed',
    next_rule_start_date: '2025-09-01',
    has_next_rule: true,
    reminder_start_date: '2025-09-16',
    auto_rule_date: '2025-09-23'
  },
  {
    program_id: 5,
    start_date: '2025-08-16',
    end_date: '2025-09-30',
    slot_duration: 30,
    slot_break: 5,
    booking_days: 7,
    status: 'open',
    next_rule_start_date: '2025-09-01',
    has_next_rule: true,
    reminder_start_date: '2025-09-16',
    auto_rule_date: '2025-09-23'
  },
  {
    program_id: 1,
    start_date: '2025-10-01',
    end_date: '2025-11-30',
    slot_duration: 20,
    slot_break: 0,
    booking_days: 7,
    status: 'draft',
    next_rule_start_date: '2025-11-01',
    has_next_rule: false,
    reminder_start_date: '2025-11-16',
    auto_rule_date: '2025-11-23'
  },
  {
    program_id: 3,
    start_date: '2025-08-01',
    end_date: '2025-09-30',
    slot_duration: 20,
    slot_break: 0,
    booking_days: 7,
    status: 'open',
    next_rule_start_date: '2025-09-01',
    has_next_rule: false,
    reminder_start_date: '2025-09-16',
    auto_rule_date: '2025-09-23'
  },
  {
    program_id: 4,
    start_date: '2025-10-01',
    end_date: '2025-11-30',
    slot_duration: 30,
    slot_break: 0,
    booking_days: 7,
    status: 'draft',
    next_rule_start_date: '2025-11-01',
    has_next_rule: false,
    reminder_start_date: '2025-11-16',
    auto_rule_date: '2025-11-23'
  },
  {
    program_id: 5,
    start_date: '2025-10-01',
    end_date: '2025-11-30',
    slot_duration: 30,
    slot_break: 5,
    booking_days: 7,
    status: 'draft',
    next_rule_start_date: '2025-11-01',
    has_next_rule: false,
    reminder_start_date: '2025-11-16',
    auto_rule_date: '2025-11-23'
  }
]

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('schedule_rules', scheduleRulesData)
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('schedule_rules', null)
  }
}
