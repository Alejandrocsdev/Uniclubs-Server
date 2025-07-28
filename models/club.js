'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Club extends Model {
    static associate(models) {
      Club.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'admin',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      })
    }
  }
  Club.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      }
    },
    {
      sequelize,
      modelName: 'Club',
      tableName: 'clubs',
      underscored: true
    }
  )

  Club.prototype.getSafeData = function (options) {
    const { id, name, createdAt, updatedAt } = this

    const safeData = { id, name }

    if (options?.ts) {
      safeData.createdAt = createdAt
      safeData.updatedAt = updatedAt
    }

    return safeData
  }

  return Club
}
