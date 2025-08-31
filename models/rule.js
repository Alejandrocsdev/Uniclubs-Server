'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Rule extends Model {
    static associate(models) {
      Rule.belongsTo(models.Venue, {
        foreignKey: { name: 'venueId', field: 'venue_id' },
        as: 'venue',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Rule.hasMany(models.Event, {
        foreignKey: { name: 'ruleId', field: 'rule_id' },
        as: 'events',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
    }
  }
  Rule.init(
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
        field: 'end_date'
      },
      openTime: {
        allowNull: false,
        type: DataTypes.TIME,
        field: 'open_time'
      },
      closeTime: {
        allowNull: false,
        type: DataTypes.TIME,
        field: 'close_time'
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
      }
    },
    {
      sequelize,
      modelName: 'Rule',
      tableName: 'rules',
      underscored: true,
      defaultScope: {
        include: [{ association: 'events', attributes: { exclude: ['createdAt', 'updatedAt'] } }]
      }
    }
  )

  return Rule
}
