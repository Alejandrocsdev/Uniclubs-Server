'use strict'

const scheduleDaysData = [
  {
    schedule_rule_id: 1,
    day: 'saturday',
    open_time: '10:00:00',
    close_time: '16:00:00'
  },
  {
    schedule_rule_id: 1,
    day: 'sunday',
    open_time: '10:00:00',
    close_time: '14:00:00'
  },
  {
    schedule_rule_id: 2,
    day: 'monday',
    open_time: '19:00:00',
    close_time: '23:00:00'
  },
  {
    schedule_rule_id: 2,
    day: 'wednesday',
    open_time: '10:00:00',
    close_time: '18:00:00'
  },
  {
    schedule_rule_id: 2,
    day: 'friday',
    open_time: '10:00:00',
    close_time: '16:00:00'
  },
  {
    schedule_rule_id: 2,
    day: 'sunday',
    open_time: '09:00:00',
    close_time: '14:00:00'
  },
  {
    schedule_rule_id: 3,
    day: 'monday',
    open_time: '11:00:00',
    close_time: '18:00:00'
  },
  {
    schedule_rule_id: 3,
    day: 'thursday',
    open_time: '10:00:00',
    close_time: '18:00:00'
  },
  {
    schedule_rule_id: 3,
    day: 'friday',
    open_time: '19:00:00',
    close_time: '23:00:00'
  },
  {
    schedule_rule_id: 4,
    day: 'tuesday',
    open_time: '10:00:00',
    close_time: '18:00:00'
  },
  {
    schedule_rule_id: 4,
    day: 'saturday',
    open_time: '10:00:00',
    close_time: '18:00:00'
  },
  {
    schedule_rule_id: 5,
    day: 'monday',
    open_time: '15:00:00',
    close_time: '23:00:00'
  },
  {
    schedule_rule_id: 5,
    day: 'tuesday',
    open_time: '08:00:00',
    close_time: '16:00:00'
  },
  {
    schedule_rule_id: 6,
    day: 'saturday',
    open_time: '11:00:00',
    close_time: '16:00:00'
  },
  {
    schedule_rule_id: 6,
    day: 'sunday',
    open_time: '10:00:00',
    close_time: '15:00:00'
  },
  {
    schedule_rule_id: 6,
    day: 'monday',
    open_time: '18:00:00',
    close_time: '23:00:00'
  },
  {
    schedule_rule_id: 7,
    day: 'monday',
    open_time: '11:00:00',
    close_time: '18:00:00'
  },
  {
    schedule_rule_id: 7,
    day: 'thursday',
    open_time: '10:00:00',
    close_time: '18:00:00'
  },
  {
    schedule_rule_id: 7,
    day: 'friday',
    open_time: '19:00:00',
    close_time: '23:00:00'
  },
  {
    schedule_rule_id: 8,
    day: 'tuesday',
    open_time: '10:00:00',
    close_time: '18:00:00'
  },
  {
    schedule_rule_id: 8,
    day: 'saturday',
    open_time: '10:00:00',
    close_time: '18:00:00'
  },
  {
    schedule_rule_id: 9,
    day: 'monday',
    open_time: '15:00:00',
    close_time: '23:00:00'
  },
  {
    schedule_rule_id: 9,
    day: 'tuesday',
    open_time: '08:00:00',
    close_time: '16:00:00'
  }
]

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('schedule_days', scheduleDaysData)
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('schedule_days', null)
  }
}
