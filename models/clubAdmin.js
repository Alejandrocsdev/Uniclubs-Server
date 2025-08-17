'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ClubAdmin extends Model {
    static associate(models) {
      ClubAdmin.belongsTo(models.User, {
        foreignKey: { name: 'userId', field: 'user_id' },
        as: 'admin',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      ClubAdmin.belongsTo(models.Club, {
        foreignKey: { name: 'clubId', field: 'club_id' },
        as: 'club',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      ClubAdmin.hasMany(models.MembershipPlan, {
        foreignKey: { name: 'clubAdminId', field: 'club_admin_id' },
        as: 'plans',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      ClubAdmin.belongsToMany(models.User, {
        through: models.ClubMembership,
        foreignKey: { name: 'clubAdminId', field: 'club_admin_id' },
        otherKey: { name: 'userId', field: 'user_id' },
        as: 'members',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
      ClubAdmin.hasMany(models.ScheduleRule, {
        foreignKey: { name: 'clubAdminId', field: 'club_admin_id' },
        as: 'scheduleRules',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      ClubAdmin.belongsToMany(models.Venue, {
        through: 'club_admin_venues',
        foreignKey: { name: 'clubAdminId', field: 'club_admin_id' },
        otherKey: { name: 'clubAdminId', field: 'club_admin_id' },
        as: 'venues',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
    }
  }
  ClubAdmin.init(
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'user_id'
      },
      clubId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'club_id'
      }
    },
    {
      sequelize,
      modelName: 'ClubAdmin',
      tableName: 'club_admins',
      underscored: true
    }
  )

  return ClubAdmin
}
