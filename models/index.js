'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV
const config = require('../config/mysql')[env]
const db = {}
// Disable default SQL logging
const sequelize = new Sequelize(config.database, config.username, config.password, { ...config, logging: false })

// Log MySQL connection status
sequelize
  .authenticate()
  .then(() => console.info(`MySQL connection successful: Database "${config.database}"`))
  .catch(() => console.error(`MySQL connection failed: Database "${config.database}"`))

// Read all model files in the current directory (excluding this file and test files)
fs.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js' && file.indexOf('.test.js') === -1
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model
  })

// Run association method for each model, if defined
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
