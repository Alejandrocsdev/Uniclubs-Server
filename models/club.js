'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Club extends Model {
    static associate(models) {
      Club.belongsToMany(models.User, {
        through: 'user_clubs',
        foreignKey: 'club_id',
        otherKey: 'user_id',
        as: 'admins',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
      Club.hasMany(models.Schedule, {
        foreignKey: 'club_id',
        as: 'schedule',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Club.hasMany(models.Booking, {
        foreignKey: 'club_id',
        as: 'bookings',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
      timeZone: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: { isIn: [Intl.supportedValuesOf('timeZone')] }
      }
    },
    {
      sequelize,
      modelName: 'Club',
      tableName: 'clubs',
      underscored: true,
      defaultScope: {
        include: [
          {
            association: 'schedule',
            attributes: ['startDate', 'endDate', 'openTime', 'closeTime', 'slotDuration', 'slotBreak']
          }
        ]
      }
    }
  )

  Club.prototype.getSafeData = function () {
    // Omit date
    const { id, name, timeZone, schedule } = this
    return { id, name, timeZone, schedule }
  }

  return Club
}
