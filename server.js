// Environment Variables
require('dotenv').config()
// Back-End Framework
const express = require('express')
// Application
const app = express()
// Cross-Origin Resource Sharing
const cors = require('./config/cors')
// Routes
const routes = require('./routes')
// Middlewares: Default Route & Global Error
const { defaultRoute, globalError } = require('./middlewares')
// Server URL
const { serverUrl } = require('./utils')

// Parse incoming JSON requests and attach the data to req.body
app.use(express.json())
// Enable CORS with custom configuration
app.use(cors)
// Mount all API routes under /api
app.use('/api', routes)
// Health check endpoint to confirm the server is running
app.get('/', (req, res) => res.status(200).json({ message: 'Server is up and running.' }))
// Catch-all route handler for undefined endpoints (404 Not Found)
app.all('*', defaultRoute)
// Global error handling middleware (handles thrown or forwarded errors)
app.use(globalError)
// Start the server and log the server URL on successful launch
app.listen(process.env.PORT, () => console.info(`Express server running on ${serverUrl}`))
