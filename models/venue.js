'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Venue extends Model {
    static associate(models) {
      Venue.belongsTo(models.Club, {
        foreignKey: { name: 'clubId', field: 'club_id' },
        as: 'club',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Venue.hasMany(models.Slot, {
        foreignKey: { name: 'venueId', field: 'venue_id' },
        as: 'slots',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
      Venue.hasMany(models.Rule, {
        foreignKey: { name: 'venueId', field: 'venue_id' },
        as: 'rules',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
    }
  }
  Venue.init(
    {
      clubId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'club_id'
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      playersLimit: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'players_limit'
      },
      sportType: {
        allowNull: true,
        type: DataTypes.STRING,
        field: 'sport_type'
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'draft',
        validate: { isIn: [['draft', 'enabled', 'disabled']] }
      }
    },
    {
      sequelize,
      modelName: 'Venue',
      tableName: 'venues',
      underscored: true,
      indexes: [{ unique: true, fields: ['clubId', 'name'] }],
      defaultScope: {
        include: [
          { association: 'slots', attributes: { exclude: ['createdAt', 'updatedAt'] } },
          { association: 'rules', attributes: { exclude: ['createdAt', 'updatedAt'] } }
        ]
      }
    }
  )

  return Venue
}
