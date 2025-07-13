// Libraries
const cors = require('cors')
// Utilities
const { clientUrl } = require('../../utils')

const allowedOrigins = [clientUrl]


const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}

module.exports = cors(corsOptions)
