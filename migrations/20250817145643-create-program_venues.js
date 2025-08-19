'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('program_venues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      program_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        // Matches the 'programs' table in the Program model
        references: { model: 'programs', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      venue_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        // Matches the 'venues' table in the Venue model
        references: { model: 'venues', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('program_venues')
  }
}
