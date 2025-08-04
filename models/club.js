'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Club extends Model {
    static associate(models) {
      Club.belongsToMany(models.User, {
        through: 'user_clubs',
        foreignKey: 'club_id',
        otherKey: 'user_id',
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
      }
    },
    {
      sequelize,
      modelName: 'Club',
      tableName: 'clubs',
      underscored: true
    }
  )

  Club.prototype.getSafeData = function () {
    const { id, name } = this
    return { id, name }
  }

  return Club
}
