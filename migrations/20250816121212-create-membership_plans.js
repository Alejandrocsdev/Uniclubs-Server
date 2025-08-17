'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('membership_plans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      club_admin_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      code: {
        allowNull: false,
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      duration_days: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      price_cents: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      currency: {
        allowNull: false,
        type: Sequelize.STRING
      },
      active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    })
  },
  async down(queryInterface) {
    await queryInterface.dropTable('membership_plans')
  }
}
