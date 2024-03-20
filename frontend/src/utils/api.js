const API_BASE_URL = 'https://data.thesisfinder.com';

// Helper function to make API requests
const makeRequest = async (url, method, headers, data) => {
  try {
    let requestConfig = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    // Disabling SSL certificate validation (not recommended for production)
    if (process.env.NODE_ENV === 'development') {
      requestConfig.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000';
      requestConfig.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';
      requestConfig.headers['Access-Control-Allow-Headers'] = 'Content-Type, Token';
    }

    // Add a body for non-GET requests
    if (method !== 'GET') {
      requestConfig.body = JSON.stringify(data);
    } else {
      // For GET requests, encode the data as query parameters
      const queryParams = new URLSearchParams(data).toString();
      url = `${url}?${queryParams}`;
    }

    const response = await fetch(`${API_BASE_URL}${url}`, requestConfig);

    // Check if response is ok before processing
    if (!response.ok) {
      let errorData;
      try {
        // Try to read the response body as text
        errorData = await response.text();
      } catch (error) {
        // If reading the response body fails, provide a generic error message
        errorData = 'Unable to read response body';
      }

      // Throw an error with the detailed error message
      throw new Error(`Request failed with status ${response.status}. Response: ${errorData}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request Error:', error.message);
    throw error;
  }
};

// Get Token API request
// Get Token API request
const getToken = (user, password) => {
  const requestData = {
    user: user,
    password: password
  };

  return makeRequest(
    '/login', 
    'POST', // Change method to POST since we're sending data in the request body
    { 'Content-Type': 'application/json' }, 
    requestData // Pass the user and password data as the request body
  );
};

export {
  getToken,
};
