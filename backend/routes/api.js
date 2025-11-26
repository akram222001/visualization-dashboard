const express = require('express');
const router = express.Router();
const { 
  getData, 
  getStatistics, 
  getFilterOptions, 
  getChartData 
} = require('../controllers/dataController');

// Health check
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Get data with filters
router.get('/data', getData);

// Get statistics
router.get('/statistics', getStatistics);

// Get filter options
router.get('/filters', getFilterOptions);

// Get chart data
router.get('/charts', getChartData);

module.exports = router;