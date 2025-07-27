'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Club extends Model {
    static associate(models) {
      Club.belongsToMany(models.User, {
        through: 'user_clubs',
        foreignKey: 'club_id',
        otherKey: 'user_id',
        as: 'admins'
      })
    }
  }
  Club.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      openTime: {
        allowNull: false,
        type: DataTypes.STRING
      },
      closeTime: {
        allowNull: false,
        type: DataTypes.TIME
      },
      slotDuration: {
        allowNull: false,
        type: DataTypes.TIME
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
    const { id, name, openTime, closeTime, createdAt, updatedAt } = this

    const safeData = { id, name, openTime, closeTime }

    if (options?.ts) {
      safeData.createdAt = createdAt
      safeData.updatedAt = updatedAt
    }

    return safeData
  }

  return Club
}
