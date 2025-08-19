'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Club extends Model {
    static associate(models) {
      Club.belongsToMany(models.User, {
        through: models.Program,
        foreignKey: { name: 'clubId', field: 'club_id' },
        otherKey: { name: 'userId', field: 'user_id' },
        as: 'admins',
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
      }
    },
    {
      sequelize,
      modelName: 'Club',
      tableName: 'clubs',
      underscored: true
    }
  )

  return Club
}
