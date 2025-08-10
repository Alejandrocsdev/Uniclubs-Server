'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    static associate(models) {
      Schedule.belongsTo(models.Club, {
        foreignKey: 'club_id',
        as: 'club',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Schedule.hasMany(models.Venue, {
        foreignKey: 'schedule_id',
        as: 'venues',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Schedule.init(
    {
      clubId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      startDate: {
        allowNull: false,
        type: DataTypes.DATEONLY
      },
      endDate: {
        allowNull: true,
        type: DataTypes.DATEONLY
      },
      openTime: {
        allowNull: false,
        type: DataTypes.TIME,
        defaultValue: '09:00:00'
      },
      closeTime: {
        allowNull: false,
        type: DataTypes.TIME,
        defaultValue: '18:00:00'
      },
      slotDuration: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 20
      },
      slotBreak: {
        allowNull: true,
        type: DataTypes.INTEGER
      }
    },
    {
      sequelize,
      modelName: 'Schedule',
      tableName: 'schedules',
      underscored: true,
      defaultScope: {
        include: [{ association: 'venues', attributes: ['name', 'maxPlayers'] }]
      }
    }
  )

  return Schedule
}
