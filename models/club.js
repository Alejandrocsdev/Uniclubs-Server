'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Club extends Model {
    static associate(models) {
      Club.belongsToMany(models.User, {
        through: 'user_clubs',
        foreignKey: { name: 'clubId', field: 'club_id' },
        otherKey: { name: 'userId', field: 'user_id' },
        as: 'admins',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
      Club.hasMany(models.Plan, {
        foreignKey: { name: 'clubId', field: 'club_id' },
        as: 'plans',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
      Club.hasMany(models.Venue, {
        foreignKey: { name: 'clubId', field: 'club_id' },
        as: 'venues',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
    }
  }
  Club.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      timeZone: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: { isIn: [Intl.supportedValuesOf('timeZone')] },
        field: 'time_zone'
      },
      bookingDays: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      active: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: 'Club',
      tableName: 'clubs',
      underscored: true,
      defaultScope: {
        include: [
          { association: 'plans', attributes: { exclude: ['createdAt', 'updatedAt'] } },
          { association: 'venues', attributes: { exclude: ['createdAt', 'updatedAt'] } }
        ]
      }
    }
  )

  Club.prototype.getSafeData = function () {
    // Omit date
    const { id, name, timeZone, plans, venues } = this
    return { id, name, timeZone, plans, venues }
  }

  return Club
}
