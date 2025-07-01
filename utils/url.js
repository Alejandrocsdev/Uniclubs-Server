// Environment Variables
const { NODE_ENV, SERVER_URL, PORT, CLIENT_URL, CLIENT_PORT } = process.env

const isProduction = NODE_ENV === 'production'

const serverUrl = isProduction ? SERVER_URL : `http://localhost:${PORT}`
const clientUrl = isProduction ? CLIENT_URL : `http://localhost:${CLIENT_PORT}`

module.exports = { serverUrl, clientUrl }
