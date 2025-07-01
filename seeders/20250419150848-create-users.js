'use strict'

const usersData = [
  { username: 'newlean14', password: '123456', email: 'alejandrocsdev@gmail.com' },
  { username: 'ian54017', password: '123456', email: 'ian54017@gmail.com' }
]

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', usersData)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null)
  }
}
