'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Membership extends Model {
    static associate(models) {
      Membership.belongsTo(models.User, {
        foreignKey: { name: 'userId', field: 'user_id' },
        as: 'member',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Membership.belongsTo(models.Plan, {
        foreignKey: { name: 'planId', field: 'plan_id' },
        as: 'plan',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Membership.init(
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'user_id'
      },
      planId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'plan_id'
      },
      startDate: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'start_date'
      },
      endDate: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'end_date'
      }
    },
    {
      sequelize,
      modelName: 'Membership',
      tableName: 'memberships',
      underscored: true
    }
  )

  return Membership
}
