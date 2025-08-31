'use strict'

const { encrypt } = require('../utils')

module.exports = {
  async up(queryInterface, Sequelize) {
    const usersData = [
      {
        uid: '1234567A',
        username: 'user',
        password: await encrypt.hash('Az123456'),
        email: 'user@gmail.com'
      },
      {
        uid: '1234567B',
        username: 'frank_user',
        password: await encrypt.hash('Az123456'),
        email: 'frank_user@gmail.com'
      },
      {
        uid: '1234567C',
        username: 'ken_user',
        password: await encrypt.hash('Az123456'),
        email: 'ken_user@gmail.com'
      },
      {
        uid: '1234567D',
        username: 'ray_user',
        password: await encrypt.hash('Az123456'),
        email: 'ray_user@gmail.com'
      },
      {
        uid: '1234567E',
        username: 'min_user',
        password: await encrypt.hash('Az123456'),
        email: 'min_user@gmail.com'
      },
      {
        uid: '1234567F',
        username: 'admin',
        password: await encrypt.hash('Az123456'),
        email: 'admin@gmail.com'
      },
      {
        uid: '1234567G',
        username: 'ted_admin',
        password: await encrypt.hash('Az123456'),
        email: 'ted_admin@gmail.com'
      },
      {
        uid: '1234567H',
        username: 'lisa_admin',
        password: await encrypt.hash('Az123456'),
        email: 'lisa_admin@gmail.com'
      },
      {
        uid: '1234567I',
        username: 'owner',
        password: await encrypt.hash('Az123456'),
        email: 'alejandrocsdev@gmail.com'
      }
    ]

    await queryInterface.bulkInsert('users', usersData)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null)
  }
}
