'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ProgramMembership extends Model {
    static associate(models) {
      ProgramMembership.belongsTo(models.User, {
        foreignKey: { name: 'userId', field: 'user_id' },
        as: 'member',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      ProgramMembership.belongsTo(models.Program, {
        foreignKey: { name: 'programId', field: 'program_id' },
        as: 'program',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  ProgramMembership.init(
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'user_id'
      },
      programId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'program_id'
      },
      startDate: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'start_date'
      },
      endDate: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'end_date'
      },
      status: {
        allowNull: true,
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'ProgramMembership',
      tableName: 'program_memberships',
      underscored: true
    }
  )

  return ProgramMembership
}
