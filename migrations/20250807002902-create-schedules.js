'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      club_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'clubs', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      open_time: {
        allowNull: false,
        type: Sequelize.TIME,
        defaultValue: '09:00:00'
      },
      close_time: {
        allowNull: false,
        type: Sequelize.TIME,
        defaultValue: '18:00:00'
      },
      slot_duration: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 20
      },
      slot_break: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: 5
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
    await queryInterface.dropTable('schedules')
  }
}
