'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('schedule_days', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      schedule_rule_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      day: {
        allowNull: false,
        type: Sequelize.ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')
      },
      open_time: {
        allowNull: false,
        type: Sequelize.TIME
      },
      close_time: {
        allowNull: true,
        type: Sequelize.TIME
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
    await queryInterface.dropTable('schedule_days')
  }
}
