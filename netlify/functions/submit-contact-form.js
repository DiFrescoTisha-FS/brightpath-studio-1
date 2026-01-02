// netlify/functions/submit-contact-form.js
// Serverless function to handle contact form submissions to GoHighLevel

const axios = require('axios');

export const handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }

  try {
    const { fullName, email, message } = JSON.parse(event.body);

    if (!fullName || !email || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Missing required form fields.' })
      };
    }

    const [firstName, ...lastNameParts] = fullName.split(' ');
    const lastName = lastNameParts.join(' ');

    const ghlApiUrl = 'https://rest.gohighlevel.com/v1/contacts/';

    const contactData = {
      firstName,
      lastName,
      email,
      customFields: [
        {
          key: 'message',
          field_value: message
        }
      ],
      tags: ['brightpath-website-contact-form']
    };

    const response = await axios.post(ghlApiUrl, contactData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GHL_API_KEY}`
      }
    });

    if (response.status === 200 || response.status === 201) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: 'Form submitted successfully!' })
      };
    } else {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ success: false, message: 'Failed to submit form.' })
      };
    }
  } catch (error) {
    console.error('API call error:', error.response ? error.response.data : error.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, message: 'An internal server error occurred.' })
    };
  }
};
