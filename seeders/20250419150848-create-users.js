'use strict'

const { encrypt } = require('../utils')

module.exports = {
  async up(queryInterface, Sequelize) {
    const usersData = [
      {
        username: 'newlean14',
        password: await encrypt.hash('123456'),
        email: 'alejandrocsdev@gmail.com'
      },
      {
        username: 'ian54017',
        password: await encrypt.hash('123456'),
        email: 'ian54017@gmail.com'
      }
    ]

    await queryInterface.bulkInsert('users', usersData)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null)
  }
}
