// src/services/api.service.ts

import axios from 'axios';

// API Base URL Configuration:
// Uses relative paths which get redirected via netlify.toml (works with both netlify dev and production)
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

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