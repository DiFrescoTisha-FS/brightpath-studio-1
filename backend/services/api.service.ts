// src/services/api.service.ts

import axios from 'axios';

// Base URL for our backend server.
const API_BASE_URL = 'http://localhost:3002/api';

// This function fetches the flip card data from our backend server.
export const getFlipCardPhases = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/phases`);
    // The data we need is directly in the response.
    return response.data;
  } catch (error) {
    console.error('Error fetching data from backend:', error);
    throw new Error('Failed to fetch flip card data.');
  }
};