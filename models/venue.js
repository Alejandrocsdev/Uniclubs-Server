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
      Venue.belongsToMany(models.Event, {
        through: 'venue_events',
        foreignKey: { name: 'venueId', field: 'venue_id' },
        otherKey: { name: 'eventId', field: 'event_id' },
        as: 'events',
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
