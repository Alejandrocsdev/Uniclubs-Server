'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      Event.belongsTo(models.Rule, {
        foreignKey: { name: 'ruleId', field: 'rule_id' },
        as: 'rule',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Event.init(
    {
      ruleId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'rule_id'
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      startDate: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        field: 'start_date'
      },
      endDate: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        field: 'end_date'
      },
      dowMask: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'dow_mask'
      },
      intervalWeeks: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 1,
        field: 'interval_weeks'
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
      }
    },
    {
      sequelize,
      modelName: 'Event',
      tableName: 'events',
      underscored: true
    }
  )

  return Event
}
