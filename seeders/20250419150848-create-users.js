'use strict'

const { encrypt } = require('../utils')

module.exports = {
  async up(queryInterface, Sequelize) {
    const usersData = [
      {
        username: 'Admin',
        password: await encrypt.hash('123456'),
        email: 'alejandrocsdev@gmail.com'
      }
    ]

    await queryInterface.bulkInsert('users', usersData)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null)
  }
}
