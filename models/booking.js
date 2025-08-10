'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Booking.belongsTo(models.Club, {
        foreignKey: 'club_id',
        as: 'club',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Booking.belongsTo(models.Venue, {
        foreignKey: 'venue_id',
        as: 'venue',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Booking.init(
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      clubId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      venueId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      date: {
        allowNull: false,
        type: DataTypes.DATEONLY
      },
      startTime: {
        allowNull: false,
        type: DataTypes.TIME
      },
      endTime: {
        allowNull: false,
        type: DataTypes.TIME
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: { isIn: [['confirmed', 'canceled', 'closed']] }
      }
    },
    {
      sequelize,
      modelName: 'Booking',
      tableName: 'bookings',
      underscored: true,
      indexes: [{ unique: true, fields: ['venue_id', 'date', 'start_time'] }]
    }
  )

  return Booking
}
