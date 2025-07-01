// Environment Variables
require('dotenv').config()

module.exports = {
  development: {
    username: process.env.MYSQL_DEV_USERNAME,
    password: process.env.MYSQL_DEV_PASSWORD,
    host: process.env.MYSQL_DEV_HOST,
    database: process.env.MYSQL_DB,
    port: Number(process.env.MYSQL_DEV_PORT),
    dialect: process.env.MYSQL_DIALECT
  },
  production: {
    username: process.env.MYSQL_PRO_USERNAME,
    password: process.env.MYSQL_PRO_PASSWORD,
    host: process.env.MYSQL_PRO_HOST,
    database: process.env.MYSQL_DB,
    port: Number(process.env.MYSQL_PRO_PORT),
    dialect: process.env.MYSQL_DIALECT
  }
}
