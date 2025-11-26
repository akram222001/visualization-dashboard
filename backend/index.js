const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./utils/database');
const apiRoutes = require('./routes/api');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Data Visualization Dashboard API',
    status: "running",
    serverTime: new Date(),
    endpoints: {
      health: '/api/health',
      data: '/api/data',
      statistics: '/api/statistics',
      filters: '/api/filters',
      charts: '/api/charts'
    }
  });
});

// Render will set PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
