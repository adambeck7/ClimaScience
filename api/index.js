const express = require('express')

// Create express instance
const app = express()

// Require API routes
const users = require('./routes/users')

// Import API Routes
app.use(users)

const cors = require('cors')
app.use(cors())

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
