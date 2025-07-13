// Environment Variables
const { NODE_ENV, SERVER_URL, PORT, CLIENT_URL, CLIENT_PORT, WIFI, WIFI_URL, PREVIEW, PREVIEW_PORT } = process.env

const isProduction = NODE_ENV === 'production'
const isWifi = WIFI === 'true'
const isPreview = PREVIEW === 'true'
const localhost = isWifi ? WIFI_URL : 'localhost'
const clientPort = isPreview ? PREVIEW_PORT : CLIENT_PORT

const serverUrl = isProduction ? SERVER_URL : `http://${localhost}:${PORT}`
const clientUrl = isProduction ? CLIENT_URL : `http://${localhost}:${clientPort}`

module.exports = { serverUrl, clientUrl }
