'use strict'

const venuesData = []

const getVenues = (length, schedule_id, max_players) => {
  return Array.from({ length }, (_, i) => ({
    schedule_id,
    name: `Venue ${i + 1}`,
    max_players
  }))
}

venuesData.push(...getVenues(6, 1, 4))
venuesData.push(...getVenues(7, 2, 2))
venuesData.push(...getVenues(8, 3, 3))

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('venues', venuesData)
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('venues', null)
  }
}
