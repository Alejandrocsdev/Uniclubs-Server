'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    static associate(models) {
      Plan.belongsTo(models.Club, {
        foreignKey: { name: 'clubId', field: 'club_id' },
        as: 'club',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Plan.hasMany(models.Membership, {
        foreignKey: { name: 'planId', field: 'plan_id' },
        as: 'memberships',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
    }
  }
  Plan.init(
    {
      clubId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'club_id'
      },
      code: {
        allowNull: false,
        type: DataTypes.STRING
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      durationDays: {
        allowNull: true,
        type: DataTypes.INTEGER,
        field: 'duration_days'
      },
      priceCents: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'price_cents'
      },
      currency: {
        allowNull: false,
        type: DataTypes.STRING
      },
      active: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: 'Plan',
      tableName: 'plans',
      underscored: true
    }
  )

  return Plan
}
