'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'otps',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        otp: {
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
        purpose: {
          allowNull: false,
          type: Sequelize.ENUM('sign-up', 'reset-password', 'recover-username')
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
      { uniqueKeys: { email_purpose_unique: { fields: ['email', 'purpose'] } } }
    )
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('otps')
  }
}
