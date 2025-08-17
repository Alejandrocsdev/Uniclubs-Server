'use strict'

const { encrypt } = require('../utils')

module.exports = {
  async up(queryInterface, Sequelize) {
    const usersData = [
      {
        username: 'guest',
        password: await encrypt.hash('123456'),
        email: 'guest@gmail.com',
        level: 'beginner'
      },
      {
        username: 'user',
        password: await encrypt.hash('123456'),
        email: 'user@gmail.com',
        level: 'beginner'
      },
      {
        username: 'frank_user',
        password: await encrypt.hash('123456'),
        email: 'frank_user@gmail.com',
        level: 'beginner'
      },
      {
        username: 'ken_user',
        password: await encrypt.hash('123456'),
        email: 'ken_user@gmail.com',
        level: 'beginner'
      },
      {
        username: 'ray_user',
        password: await encrypt.hash('123456'),
        email: 'ray_user@gmail.com',
        level: 'beginner'
      },
      {
        username: 'min_user',
        password: await encrypt.hash('123456'),
        email: 'min_user@gmail.com',
        level: 'beginner'
      },
      {
        username: 'admin',
        password: await encrypt.hash('123456'),
        email: 'admin@gmail.com',
        level: 'intermediate'
      },
      {
        username: 'ted_admin',
        password: await encrypt.hash('123456'),
        email: 'ted_admin@gmail.com',
        level: 'intermediate'
      },
      {
        username: 'lisa_admin',
        password: await encrypt.hash('123456'),
        email: 'lisa_admin@gmail.com',
        level: 'intermediate'
      },
      {
        username: 'owner',
        password: await encrypt.hash('123456'),
        email: 'alejandrocsdev@gmail.com',
        level: 'advanced'
      }
    ]

    await queryInterface.bulkInsert('users', usersData)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null)
  }
}
