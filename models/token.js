'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    // static associate(models) {}
  }
  Token.init(
    {
      clubId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'club_id'
      },
      token: {
        allowNull: false,
        type: DataTypes.STRING
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING
      },
      expireTime: {
        allowNull: false,
        type: DataTypes.BIGINT,
        field: 'expire_time'
      }
    },
    {
      sequelize,
      modelName: 'Token',
      tableName: 'tokens',
      underscored: true,
      indexes: [{ unique: true, fields: ['club_id', 'email'] }]
    }
  )

  return Token
}
