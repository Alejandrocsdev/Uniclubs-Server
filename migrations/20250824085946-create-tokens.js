'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'tokens',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        club_id: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        token: {
          allowNull: false,
          type: Sequelize.STRING
        },
        email: {
          allowNull: false,
          type: Sequelize.STRING
        },
        expire_time: {
          allowNull: false,
          type: Sequelize.BIGINT
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
      },
      { uniqueKeys: { id_email_unique: { fields: ['club_id', 'email'] } } }
    )
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tokens')
  }
}
