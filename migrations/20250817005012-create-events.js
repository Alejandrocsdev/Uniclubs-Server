'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      schedule_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        // Matches the 'schedules' table in the Schedule model
        references: { model: 'schedules', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      start_date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      end_date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      dow_mask: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      interval_weeks: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      start_time: {
        allowNull: false,
        type: Sequelize.TIME
      },
      end_time: {
        allowNull: false,
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
    await queryInterface.dropTable('events')
  }
}
