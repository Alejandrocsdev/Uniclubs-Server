'use strict'

const plansData = [
  {
    club_id: 1,
    code: '1D',
    name: 'Day Pass',
    duration_days: 1,
    price_cents: 1500,
    currency: 'EUR',
    active: false
  },
  {
    club_id: 1,
    code: '2W',
    name: '2-Week Membership',
    duration_days: 14,
    price_cents: 7000,
    currency: 'EUR',
    active: false
  },
  {
    club_id: 1,
    code: '2M',
    name: '2-Month Membership',
    duration_days: 60,
    price_cents: 18900,
    currency: 'EUR',
    active: true
  },

  {
    club_id: 2,
    code: '1D',
    name: 'Day Pass',
    duration_days: 1,
    price_cents: 30000,
    currency: 'TWD',
    active: true
  },
  {
    club_id: 2,
    code: '1M',
    name: '1-Month Membership',
    duration_days: 30,
    price_cents: 250000,
    currency: 'TWD',
    active: true
  },
  {
    club_id: 2,
    code: '6M',
    name: '6-Month Membership',
    duration_days: 180,
    price_cents: 1200000,
    currency: 'TWD',
    active: true
  },

  {
    club_id: 3,
    code: 'TRI',
    name: 'Trial (3 Days)',
    duration_days: 3,
    price_cents: 5000,
    currency: 'TWD',
    active: true
  },
  {
    club_id: 3,
    code: '1M',
    name: '1-Month Membership',
    duration_days: 30,
    price_cents: 200000,
    currency: 'TWD',
    active: true
  },
  {
    club_id: 3,
    code: '3M',
    name: '3-Month Membership',
    duration_days: 90,
    price_cents: 540000,
    currency: 'TWD',
    active: true
  }
]

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('plans', plansData)
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('plans', null)
  }
}
