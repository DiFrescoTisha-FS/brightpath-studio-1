// src/services/api.service.ts

import axios from 'axios';
// This is the correct Vite method to access the VITE_API_URL set in Netlify.
// We include the fallback for local development convenience.
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';

// Note: The base URL from our Serverless deployment is:
// https://4hutktucbj.execute-api.us-east-1.amazonaws.com/dev
// The path for our Express route is '/api/phases'.

// This function fetches the flip card data from our backend server.
export const getFlipCardPhases = async () => {
  try {
    // We construct the full, correct URL using the dynamic base URL.
    const response = await axios.get(`${API_BASE_URL}/api/phases`);
    // The data we need is directly in the response.
    return response.data;
  } catch (error) {
    // Log the error for debugging.
    console.error('Error fetching data from backend:', error);
    throw new Error('Failed to fetch flip card data.');
  }
};