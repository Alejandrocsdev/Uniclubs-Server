'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Venue extends Model {
    static associate(models) {
      Venue.belongsToMany(models.ClubAdmin, {
        through: 'club_admin_venues',
        foreignKey: { name: 'venueId', field: 'venue_id' },
        otherKey: { name: 'clubAdminId', field: 'club_admin_id' },
        as: 'programs',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
      Venue.hasMany(models.Slot, {
        foreignKey: { name: 'venueId', field: 'venue_id' },
        as: 'slots',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
    }
  }
  Venue.init(
    {
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
      }
    },
    {
      sequelize,
      modelName: 'Venue',
      tableName: 'venues',
      underscored: true
    }
  )

  return Venue
}
