'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Venue extends Model {
    static associate(models) {
      Venue.belongsTo(models.Schedule, {
        foreignKey: 'schedule_id',
        as: 'schedule',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Venue.init(
    {
      scheduleId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      maxPlayers: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
    },
    {
      sequelize,
      modelName: 'Venue',
      tableName: 'venues',
      underscored: true
    }
  )

  // Venue.prototype.getSafeData = function () {
  //   // Omit date
  //   const { id, name, maxPlayers } = this
  //   return { id, name, maxPlayers }
  // }

  return Venue
}
