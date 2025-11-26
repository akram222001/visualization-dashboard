import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const api = {
  // Get data with filters
  getData: (params) => axios.get(`${API_BASE}/data`, { params }),
  
  // Get statistics
  getStatistics: () => axios.get(`${API_BASE}/statistics`),
  
  // Get filter options
  getFilters: () => axios.get(`${API_BASE}/filters`),
  
  // Get chart data
  getCharts: (type) => axios.get(`${API_BASE}/charts?type=${type}`)
};