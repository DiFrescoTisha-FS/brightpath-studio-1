// src/services/api.service.ts

import axios from 'axios';

// API Base URL Configuration:
// - In production (Netlify): Uses relative paths which get redirected via netlify.toml
// - In development: Falls back to localhost:3002 for the local Express server
const API_BASE_URL = import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? '' : 'http://localhost:3002');

// This function fetches the flip card data from our backend server.
export const getFlipCardPhases = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/phases`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from backend:', error);
    throw new Error('Failed to fetch flip card data.');
  }
};