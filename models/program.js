'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Program extends Model {
    static associate(models) {
      Program.belongsTo(models.User, {
        foreignKey: { name: 'userId', field: 'user_id' },
        as: 'admin',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Program.belongsTo(models.Club, {
        foreignKey: { name: 'clubId', field: 'club_id' },
        as: 'club',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Program.hasMany(models.MembershipPlan, {
        foreignKey: { name: 'programId', field: 'program_id' },
        as: 'plans',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Program.belongsToMany(models.User, {
        through: models.ClubMembership,
        foreignKey: { name: 'programId', field: 'program_id' },
        otherKey: { name: 'userId', field: 'user_id' },
        as: 'members',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
      Program.hasMany(models.ScheduleRule, {
        foreignKey: { name: 'programId', field: 'program_id' },
        as: 'scheduleRules',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Program.belongsToMany(models.Venue, {
        through: 'program_venues',
        foreignKey: { name: 'programId', field: 'program_id' },
        otherKey: { name: 'programId', field: 'program_id' },
        as: 'venues',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
    }
  }
  Program.init(
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
      modelName: 'Program',
      tableName: 'programs',
      underscored: true
    }
  )

  return Program
}
