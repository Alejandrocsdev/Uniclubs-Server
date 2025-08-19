'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    static associate(models) {
      Plan.belongsTo(models.Program, {
        foreignKey: { name: 'programId', field: 'program_id' },
        as: 'program',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Plan.init(
    {
      programId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'program_id'
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
        defaultValue: true
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
