'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ScheduleRule extends Model {
    static associate(models) {
      ScheduleRule.belongsTo(models.ClubAdmin, {
        foreignKey: { name: 'clubAdminId', field: 'club_admin_id' },
        as: 'program',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      ScheduleRule.hasMany(models.ScheduleDay, {
        foreignKey: { name: 'scheduleRuleId', field: 'schedule_rule_id' },
        as: 'scheduleDays',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  ScheduleRule.init(
    {
      clubAdminId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'club_admin_id'
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
        type: DataTypes.STRING
      },
      nextRuleStartDate: {
        allowNull: false,
        type: DataTypes.DATE,
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
        type: DataTypes.DATE,
        field: 'reminder_start_date'
      },
      autoRuleDate: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'auto_rule_date'
      }
    },
    {
      sequelize,
      modelName: 'ScheduleRule',
      tableName: 'schedule_rules',
      underscored: true
    }
  )

  return ScheduleRule
}
