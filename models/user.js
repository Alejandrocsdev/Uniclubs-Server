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
      User.belongsToMany(models.Club, {
        through: 'user_clubs',
        foreignKey: 'user_id',
        otherKey: 'club_id',
        as: 'clubs',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
      },
      level: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'beginner',
        validate: { isIn: [['beginner', 'intermediate', 'advanced']] }
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
          { association: 'clubs', attributes: ['id', 'name'], through: { attributes: [] } }
        ]
      }
    }
  )

  User.prototype.getSafeData = function () {
    // Omit password, refreshToken, date
    // Convert roles to an array of role names
    const { id, username, email, roles = [], clubs } = this
    return { id, username, email, roles: roles.map(role => role.name), clubs }
  }

  return User
}
