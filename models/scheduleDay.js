'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ScheduleDay extends Model {
    static associate(models) {
      ScheduleDay.belongsTo(models.ScheduleRule, {
        foreignKey: { name: 'scheduleRuleId', field: 'schedule_rule_id' },
        as: 'scheduleRule',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  ScheduleDay.init(
    {
      scheduleRuleId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'schedule_rule_id'
      },
      day: {
        allowNull: false,
        type: DataTypes.ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')
      },
      openTime: {
        allowNull: false,
        type: DataTypes.TIME,
        field: 'open_time'
      },
      closeTime: {
        allowNull: true,
        type: DataTypes.TIME,
        field: 'close_time'
      }
    },
    {
      sequelize,
      modelName: 'ScheduleDay',
      tableName: 'schedule_days',
      underscored: true
    }
  )

  return ScheduleDay
}
