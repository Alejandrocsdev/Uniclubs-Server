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
      Booking.belongsTo(models.User, {
        foreignKey: { name: 'userId', field: 'user_id' },
        as: 'member',
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
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'user_id'
      },
      size: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      level: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'beginner',
        validate: { isIn: [['beginner', 'intermediate', 'advanced']] }
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
