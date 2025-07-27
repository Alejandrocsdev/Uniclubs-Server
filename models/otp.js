'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Otp extends Model {
    // static associate(models) {}
  }
  Otp.init(
    {
      otp: {
        allowNull: false,
        type: DataTypes.STRING
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING
      },
      expireTime: {
        allowNull: false,
        type: DataTypes.BIGINT
      },
      purpose: {
        allowNull: false,
        type: DataTypes.ENUM('sign-up', 'reset-password', 'recover-username')
      }
    },
    {
      sequelize,
      modelName: 'Otp',
      tableName: 'otps',
      underscored: true,
      indexes: [{ unique: true, fields: ['email', 'purpose'] }]
    }
  )

  return Otp
}
