// Environment Variables
require('dotenv').config()
// Back-End Framework
const express = require('express')
// Application
const app = express()
// Cross-Origin Resource Sharing
const cors = require('./config/cors')
// Cookie Parser
const cookieParser = require('cookie-parser')
// Routes
const routes = require('./routes')
// Middlewares: Rate Limiter & Default Route & Global Error
const { rateLimiter, defaultRoute, globalError } = require('./middlewares')
// Server URL
const { serverUrl } = require('./utils')

// Enable trust proxy to properly detect client IPs and protocol
app.set('trust proxy', true)
// Enable CORS with custom configuration
app.use(cors)
// Parse cookies attached to the client request
app.use(cookieParser())
// Parse incoming JSON requests and attach the data to req.body
app.use(express.json())
// Mount all API routes under /api
app.use('/api', rateLimiter, routes)
// Handle browser's automatic favicon.ico requests with 204 (No Content)
app.get('/favicon.ico', (req, res) => res.sendStatus(204))
// Health check endpoint to confirm the server is running
app.get('/', (req, res) => res.status(200).json({ message: 'Workflow successful!!' }))
// Catch-all route handler for undefined endpoints (404 Not Found)
app.all('*', defaultRoute)
// Global error handling middleware (handles thrown or forwarded errors)
app.use(globalError)
// Start the server and log the server URL on successful launch
app.listen(process.env.PORT, () => console.info(`Express server running on ${serverUrl}`))
