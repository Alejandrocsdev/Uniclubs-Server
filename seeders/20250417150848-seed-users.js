'use strict'

const { encrypt } = require('../utils')

module.exports = {
  async up(queryInterface, Sequelize) {
    const usersData = [
      {
        username: 'guest',
        password: await encrypt.hash('123456'),
        email: 'guest@gmail.com'
      },
      {
        username: 'user',
        password: await encrypt.hash('123456'),
        email: 'user@gmail.com'
      },
      {
        username: 'admin',
        password: await encrypt.hash('123456'),
        email: 'admin@gmail.com'
      },
      {
        username: 'owner',
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
