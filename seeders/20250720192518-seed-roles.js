'use strict'

const roles = ['guest', 'user', 'admin', 'owner']
const rolesData = roles.map(role => ({ name: role }))

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('roles', rolesData)
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('roles', null)
  }
}
