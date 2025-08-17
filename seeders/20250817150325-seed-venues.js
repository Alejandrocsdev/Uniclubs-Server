'use strict'

const venuesData = [
  {
    name: 'Venue 1',
    players_limit: 4,
    sport_type: 'badminton'
  },
  {
    name: 'Venue 2',
    players_limit: 4,
    sport_type: 'badminton'
  },
  {
    name: 'Venue 3',
    players_limit: 4,
    sport_type: 'badminton'
  },
  {
    name: 'Venue 4',
    players_limit: 4,
    sport_type: 'badminton'
  },
  {
    name: 'Venue 5',
    players_limit: 2,
    sport_type: 'badminton'
  },
  {
    name: 'Venue 6',
    players_limit: 2,
    sport_type: 'badminton'
  },
  {
    name: 'Venue 1',
    players_limit: 4,
    sport_type: 'badminton'
  },
  {
    name: 'Venue 2',
    players_limit: 4,
    sport_type: 'badminton'
  },
  {
    name: 'Venue 3',
    players_limit: 4,
    sport_type: 'badminton'
  },
  {
    name: 'Venue 4',
    players_limit: 4,
    sport_type: 'badminton'
  },
  {
    name: 'Venue 5',
    players_limit: 2,
    sport_type: 'badminton'
  },
  {
    name: 'Venue 6',
    players_limit: 2,
    sport_type: 'badminton'
  },
  {
    name: 'Venue 1',
    players_limit: 4,
    sport_type: 'badminton'
  },
  {
    name: 'Venue 2',
    players_limit: 4,
    sport_type: 'badminton'
  },
  {
    name: 'Venue 3',
    players_limit: 4,
    sport_type: 'badminton'
  },
  {
    name: 'Venue 4',
    players_limit: 4,
    sport_type: 'badminton'
  },
  {
    name: 'Venue 5',
    players_limit: 2,
    sport_type: 'badminton'
  },
  {
    name: 'Venue 6',
    players_limit: 2,
    sport_type: 'badminton'
  },
  {
    name: 'Venue 7',
    players_limit: 4,
    sport_type: 'badminton'
  },
  {
    name: 'Venue 8',
    players_limit: 2,
    sport_type: 'badminton'
  },
  {
    name: 'Venue 9',
    players_limit: 2,
    sport_type: 'badminton'
  },
  {
    name: 'Venue 1',
    players_limit: 4,
    sport_type: 'badminton'
  },
  {
    name: 'Venue 2',
    players_limit: 4,
    sport_type: 'badminton'
  },
  {
    name: 'Venue 3',
    players_limit: 4,
    sport_type: 'badminton'
  },
  {
    name: 'Venue 4',
    players_limit: 4,
    sport_type: 'badminton'
  },
  {
    name: 'Venue 1',
    players_limit: 4,
    sport_type: 'badminton'
  },
  {
    name: 'Venue 2',
    players_limit: 4,
    sport_type: 'badminton'
  },
  {
    name: 'Venue 3',
    players_limit: 4,
    sport_type: 'badminton'
  },
  {
    name: 'Venue 4',
    players_limit: 4,
    sport_type: 'badminton'
  }
]

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('venues', venuesData)
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('venues', null)
  }
}
