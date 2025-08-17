'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.Slot, {
        foreignKey: { name: 'slotId', field: 'slot_id' },
        as: 'slot',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
    }
  }
  Booking.init(
    {
      slotId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'slot_id'
      },
      size: {
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
      modelName: 'Booking',
      tableName: 'bookings',
      underscored: true
    }
  )

  return Booking
}
