'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('club_admin_venues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      club_admin_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        // Matches the 'club_admins' table in the ClubAdmin model
        references: { model: 'club_admins', key: 'id' },
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
    await queryInterface.dropTable('club_admin_venues')
  }
}
