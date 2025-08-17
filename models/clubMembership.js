'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ClubMembership extends Model {
    static associate(models) {
      ClubMembership.belongsTo(models.User, {
        foreignKey: { name: 'userId', field: 'user_id' },
        as: 'member',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      ClubMembership.belongsTo(models.ClubAdmin, {
        foreignKey: { name: 'clubAdminId', field: 'club_admin_id' },
        as: 'program',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  ClubMembership.init(
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'user_id'
      },
      clubAdminId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'club_admin_id'
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
      },
      status: {
        allowNull: true,
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'ClubMembership',
      tableName: 'club_memberships',
      underscored: true
    }
  )

  return ClubMembership
}
