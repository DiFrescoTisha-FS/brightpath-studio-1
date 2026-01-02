// netlify/functions/phases.js
// Serverless function to fetch phase card data from WordPress

const axios = require('axios');

export const handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const endpoint = 'wp/v2/phase-card?acf_format=standard&order=asc';
    const fullUrl = `${process.env.WORDPRESS_API_URL}/wp-json/${endpoint}`;

    const response = await axios.get(fullUrl, {
      headers: {
        'Authorization': `Basic ${Buffer.from(`brightpath-user-name:${process.env.WORDPRESS_APP_PASSWORD}`).toString('base64')}`
      }
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error('Error fetching phases:', error.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to fetch phase data' })
    };
  }
};
