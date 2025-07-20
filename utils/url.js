// Environment Variables
const { NODE_ENV, SERVER_URL, PORT, CLIENT_URL, CLIENT_PORT, WIFI, WIFI_URL } = process.env

const isProduction = NODE_ENV === 'production'
const isWifi = WIFI === 'true'
const localhost = isWifi ? WIFI_URL : 'localhost'

const serverUrl = isProduction ? SERVER_URL : `http://${localhost}:${PORT}`
const clientUrl = isProduction ? CLIENT_URL : `http://${localhost}:${CLIENT_PORT}`

module.exports = { serverUrl, clientUrl }
