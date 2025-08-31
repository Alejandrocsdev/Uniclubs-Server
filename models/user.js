'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Role, {
        through: 'user_roles',
        foreignKey: { name: 'userId', field: 'user_id' },
        otherKey: { name: 'roleId', field: 'role_id' },
        as: 'roles',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
      User.belongsToMany(models.Club, {
        through: 'user_clubs',
        foreignKey: { name: 'userId', field: 'user_id' },
        otherKey: { name: 'clubId', field: 'club_id' },
        as: 'clubs',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
      User.hasMany(models.Membership, {
        foreignKey: { name: 'userId', field: 'user_id' },
        as: 'memberships',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
      User.hasMany(models.Booking, {
        foreignKey: { name: 'userId', field: 'user_id' },
        as: 'bookings',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
    }
  }
  User.init(
    {
      uid: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
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
        include: [
          { association: 'roles', attributes: ['name'] },
          { association: 'clubs', attributes: ['id', 'name', 'time_zone'], through: { attributes: [] } }
        ]
      }
    }
  )

  User.prototype.getSafeData = function () {
    // Omit password, refreshToken, date
    // Convert roles to an array of role names
    const { id, uid, username, email, roles, clubs } = this
    return { id, uid, username, email, roles: roles.map(role => role.name), clubs }
  }

  return User
}
