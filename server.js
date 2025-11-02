// Environment Variables
require('dotenv').config();
// Core & Frameworks
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');

// Application
const app = express();
const server = http.createServer(app);

// Middlewares
const cookie = require('cookie-parser');
const {
  cors,
  rateLimiter,
  defaultRoute,
  globalError,
} = require('./middlewares');
// Routes
const routes = require('./routes');
// Utils
const { clientUrl, serverUrl } = require('./utils');

// 🧠 Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: clientUrl,
    credentials: true,
  },
});

let count = 0;

io.on('connection', (socket) => {
  console.log(`🟢 Client connected: ${socket.id}`);

  socket.emit('welcome', { message: 'Connected to Socket.IO server!' });

  socket.on('message', (data) => {
    console.log('📩 Received:', data);
    socket.emit('echo', data);
  });

  socket.on('broadcast', (msg) => {
    socket.broadcast.emit('new-broadcast', msg);
  });

	  // Send current count to newly connected client
  socket.emit('countUpdated', { count });

  socket.on('disconnect', (reason) => {
    console.log(`❌ ${socket.id} disconnected (${reason})`);
  });
});

// Make io accessible inside routes
app.set('io', io);
// Enable trust proxy to properly detect client IPs and protocol
app.set('trust proxy', true);
// Parse incoming JSON requests and attach the data to req.body
app.use(express.json());
// Parse cookies attached to the client request
app.use(cookie());
// Enable CORS with custom configuration
app.use(cors);
// Mount all API routes under /api
app.use('/api', rateLimiter, routes);
// Handle browser's automatic favicon.ico requests with 204 (No Content)
app.get('/favicon.ico', (req, res) => res.sendStatus(204));
// Health check endpoint to confirm the server is running
app.get('/', (req, res) =>
  res.status(200).json({ message: 'Workflow successful!' }),
);

// 🔹 API endpoint to get current count
app.get('/api/count', (req, res) => {
  res.json({ count });
});

// 🔹 API endpoint to increment the count
app.post('/api/count/increment', (req, res) => {
  count++;
  io.emit('countUpdated', { count }); // Notify all connected clients
  res.json({ count });
});

// Catch-all route handler for undefined endpoints (404 Not Found)
app.all('*', defaultRoute);
// Global error handling middleware (handles thrown or forwarded errors)
app.use(globalError);

// Start HTTP + Socket.IO server
server.listen(process.env.PORT, () => {
  console.info(`🚀 Express + Socket.IO server running on ${serverUrl}`);
});
