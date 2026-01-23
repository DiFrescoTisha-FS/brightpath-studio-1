// netlify/functions/reviews.js
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
    // Explicitly request excerpt field along with ACF data
    const fullUrl = `${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/reviews?acf_format=standard&_fields=id,title,content,excerpt,acf`;

    const response = await axios.get(fullUrl);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error('Error fetching reviews:', error.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to fetch reviews' })
    };
  }
};
