'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Venue extends Model {
    static associate(models) {
      Venue.belongsTo(models.Schedule, {
        foreignKey: 'schedule_id',
        as: 'schedule',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Venue.hasMany(models.Booking, {
        foreignKey: 'venue_id',
        as: 'bookings',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }

    static default(count, scheduleId, maxPlayers) {
      return Array.from({ length: count }, (_, i) => ({
        scheduleId,
        name: `Venue ${i + 1}`,
        maxPlayers
      }))
    }
  }
  Venue.init(
    {
      scheduleId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      maxPlayers: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
    },
    {
      sequelize,
      modelName: 'Venue',
      tableName: 'venues',
      underscored: true
    }
  )

  return Venue
}
