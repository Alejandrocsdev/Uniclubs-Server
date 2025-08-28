'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    static associate(models) {
      Schedule.belongsTo(models.Venue, {
        foreignKey: { name: 'venueId', field: 'venue_id' },
        as: 'venue',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Schedule.hasMany(models.Event, {
        foreignKey: { name: 'scheduleId', field: 'schedule_id' },
        as: 'events',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
    }
  }
  Schedule.init(
    {
      venueId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'venue_id'
      },
      startDate: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        field: 'start_date'
      },
      endDate: {
        allowNull: true,
        type: DataTypes.DATEONLY,
        defaultValue: null,
        field: 'end_date'
      },
      slotDuration: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'slot_duration'
      },
      slotBreak: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'slot_break'
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'closed'
      }
    },
    {
      sequelize,
      modelName: 'Schedule',
      tableName: 'schedules',
      underscored: true
    }
  )

  return Schedule
}
