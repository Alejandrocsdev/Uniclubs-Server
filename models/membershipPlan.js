'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class MembershipPlan extends Model {
    static associate(models) {
      MembershipPlan.belongsTo(models.ClubAdmin, {
        foreignKey: { name: 'clubAdminId', field: 'club_admin_id' },
        as: 'program',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  MembershipPlan.init(
    {
      clubAdminId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'club_admin_id'
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
      modelName: 'MembershipPlan',
      tableName: 'membership_plans',
      underscored: true
    }
  )

  return MembershipPlan
}
