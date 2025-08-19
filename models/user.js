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
        through: 'programs',
        foreignKey: 'user_id',
        otherKey: 'club_id',
        as: 'programs',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
      User.belongsToMany(models.Program, {
        through: 'club_memberships',
        foreignKey: 'user_id',
        otherKey: 'program_id',
        as: 'memberships',
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
      level: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'beginner',
        validate: { isIn: [['beginner', 'intermediate', 'advanced']] }
      },
      refreshToken: {
        allowNull: true,
        type: DataTypes.STRING,
        field: 'refresh_token'
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      underscored: true,
      defaultScope: {
        include: [{ association: 'roles', attributes: ['name'] }]
      }
    }
  )

  User.prototype.getSafeData = function () {
    // Omit password, refreshToken, date
    // Convert roles to an array of role names
    const { id, username, email, roles } = this
    return { id, username, email, roles: roles.map(role => role.name) }
  }

  return User
}
