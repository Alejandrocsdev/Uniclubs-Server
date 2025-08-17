'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('slots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      venue_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        // Matches the 'venues' table in the Venue model
        references: { model: 'venues', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      start_time: {
        allowNull: false,
        type: Sequelize.TIME
      },
      end_time: {
        allowNull: false,
        type: Sequelize.TIME
      },
      capacity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('slots')
  }
}
