'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Role, {
        through: 'user_roles',
        foreignKey: 'user_id',
        otherKey: 'role_id',
        as: 'roles'
      })
      User.belongsToMany(models.Club, {
        through: 'user_clubs',
        foreignKey: 'user_id',
        otherKey: 'club_id',
        as: 'clubs'
      })
    }
  }
  User.init(
    {
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      refreshToken: {
        allowNull: true,
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      underscored: true,
      defaultScope: {
        include: [
          { association: 'roles', attributes: ['name'] },
          {
            association: 'clubs',
            attributes: ['id', 'openTime', 'closeTime', 'slotDuration'],
            through: { attributes: [] }
          }
        ]
      }
    }
  )

  User.prototype.getSafeData = function (options) {
    // Omit password, refreshToken
    const { id, username, email, roles = [], clubs = [], createdAt, updatedAt } = this

    const safeData = { id, username, email, roles: roles.map(role => role.name), clubs }

    if (options?.ts) {
      safeData.createdAt = createdAt
      safeData.updatedAt = updatedAt
    }

    return safeData
  }

  return User
}
