import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

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