'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    static associate(models) {
      Schedule.belongsTo(models.Club, {
        foreignKey: { name: 'clubId', field: 'club_id' },
        as: 'club',
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
      clubId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'club_id'
      },
      startDate: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        field: 'start_date'
      },
      endDate: {
        allowNull: true,
        type: DataTypes.DATEONLY,
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
      bookingDays: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'booking_days'
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'closed'
      },
      nextRuleStartDate: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        field: 'next_rule_start_date'
      },
      hasNextRule: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'has_next_rule'
      },
      reminderStartDate: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        field: 'reminder_start_date'
      },
      autoRuleDate: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        field: 'auto_rule_date'
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
