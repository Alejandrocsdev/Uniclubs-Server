'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Slot extends Model {
    static associate(models) {
      Slot.belongsTo(models.Venue, {
        foreignKey: { name: 'venueId', field: 'venue_id' },
        as: 'venue',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
      Slot.hasMany(models.Booking, {
        foreignKey: { name: 'slotId', field: 'slot_id' },
        as: 'bookings',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
    }
  }
  Slot.init(
    {
      venueId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'venue_id'
      },
      date: {
        allowNull: false,
        type: DataTypes.DATEONLY
      },
      startTime: {
        allowNull: false,
        type: DataTypes.TIME,
        field: 'start_time'
      },
      endTime: {
        allowNull: false,
        type: DataTypes.TIME,
        field: 'end_time'
      },
      capacity: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'Slot',
      tableName: 'slots',
      underscored: true
    }
  )

  return Slot
}
