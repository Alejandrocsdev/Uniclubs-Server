// Environment Variables
const { NODE_ENV, SERVER_URL, PORT, CLIENT_URL, CLIENT_PORT, WIFI, WIFI_URL } = process.env

const isProduction = NODE_ENV === 'production'
const isWifi = WIFI === 'true'

const serverUrl = isProduction ? SERVER_URL : `http://${isWifi ? WIFI_URL : 'localhost'}:${PORT}`
const clientUrl = isProduction ? CLIENT_URL : `http://${isWifi ? WIFI_URL : 'localhost'}:${CLIENT_PORT}`

module.exports = { serverUrl, clientUrl }
