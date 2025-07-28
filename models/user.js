'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Role, {
        through: 'user_roles',
        foreignKey: 'user_id',
        otherKey: 'role_id',
        as: 'roles',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
      User.hasOne(models.Club, {
        foreignKey: 'user_id',
        as: 'club',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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
          { association: 'club', attributes: ['id', 'name'] }
        ]
      }
    }
  )

  User.prototype.getSafeData = function (options) {
    // Omit password, refreshToken
    const { id, username, email, roles = [], club, createdAt, updatedAt } = this

    const safeData = { id, username, email, roles: roles.map(role => role.name), club }

    if (options?.ts) {
      safeData.createdAt = createdAt
      safeData.updatedAt = updatedAt
    }

    return safeData
  }

  return User
}
