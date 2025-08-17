'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      slot_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        // Matches the 'venues' table in the Venue model
        references: { model: 'slots', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      size: {
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
    await queryInterface.dropTable('bookings')
  }
}
