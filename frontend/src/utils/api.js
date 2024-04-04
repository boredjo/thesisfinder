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

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      // Return null for non-JSON responses
      return null;
    }
  } catch (error) {
    console.error('API Request Error:', error.message);
    throw error;
  }
};

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

// Register User API request
const registerUser = (userData) => {
  return makeRequest(
    '/user',
    'POST',
    { 'Content-Type': 'application/json' },
    userData
  );
};

// Get User API request
const getUser = (token) => {
  return makeRequest(
    '/user',
    'GET',
    { 'Content-Type': 'application/json', 'Token': token }
  );
};

// Create User API request
const createUser = (userData) => {
  return makeRequest(
    '/user',
    'POST',
    { 'Content-Type': 'application/json' },
    userData
  );
};

// Update User API request
const updateUser = (userData, token) => {
  return makeRequest(
    '/user',
    'POST',
    { 'Content-Type': 'application/json', 'Token': token },
    userData
  );
};

// Get Featured Ideas API request
const getFeaturedIdeas = () => {
  return makeRequest(
    '/idea/featured',
    'GET',
    { 'Content-Type': 'application/json'}
  );
};

// Submit Idea API request
const submitIdea = (ideaData, token) => {
  return makeRequest(
    '/idea/',
    'POST',
    { 'Content-Type': 'application/json', 'Token': token },
    ideaData
  );
};

// Get Idea Details API request
const getIdeaDetails = (ideaId, token) => {
  return makeRequest(
    `/idea/details/${ideaId}`,
    'GET',
    { 'Content-Type': 'application/json', 'Token': token }
  );
};

// Update Profile Picture API request
const updateProfilePicture = (formData, token) => {
  const headers = {
    'Token': token,
    'Content-Type': 'image/png'
  };

  return makeRequest(
    '/profilepicture',
    'POST',
    headers,
    formData // Pass FormData object
  );
};

// Get Profile Picture by Username API request
const getProfilePictureByUsername = (username) => {
  return makeRequest(
    `/profilepicture/${username}`,
    'GET',
  );
};

// Claim Idea API request
const claimIdea = (ideaId, token) => {
  return makeRequest(
    '/claim/',
    'POST',
    { 'Token': token },
    { 'idea': ideaId }
  );
};

// Get Claim from User API request
const getClaimFromUser = (token) => {
  return makeRequest(
    '/claim/user/',
    'GET',
    { 'Token': token }
  );
};

// Get Claim from Any User API request
const getClaimFromAnyUser = (username) => {
  return makeRequest(
    `/claim/user/${username}`,
    'GET',
    { 'Content-Type': 'application/json' }
  );
};

// Get Claim from Question API request
const getClaimFromQuestion = (ideaId) => {
  return makeRequest(
    `/claim/idea/${ideaId}`,
    'GET',
    { 'Content-Type': 'application/json' }
  );
};

// Delete a Claim API request
const deleteClaim = (claimId, token) => {
  return makeRequest(
    `/claim/${claimId}`,
    'DELETE',
    { 'Token': token }
  );
};

// Sponsor an Idea API request
const sponsorIdea = (sponsorData, token) => {
  return makeRequest(
    '/sponsor/',
    'POST',
    { 'Content-Type': 'application/json', 'Token': token },
    sponsorData
  );
};

// Get Sponsorship Details API request
const getSponsorshipDetails = (ideaId, token) => {
  return makeRequest(
    `/sponsor/${ideaId}`,
    'GET',
    { 'Content-Type': 'application/json', 'Token': token }
  );
};

// Get Sponsorships from User API request
const getSponsorshipsFromUser = (token) => {
  return makeRequest(
    '/sponsor/user/',
    'GET',
    { 'Token': token }
  );
};

// Get Sponsorships from Any User API request
const getSponsorshipsFromAnyUser = (username) => {
  return makeRequest(
    `/sponsor/user/${username}`,
    'GET',
    { 'Content-Type': 'application/json' }
  );
};

// Get Sponsorships for Ideas API request
const getSponsorshipsForIdeas = (ideaId) => {
  return makeRequest(
    `/sponsor/idea/${ideaId}`,
    'GET',
    { 'Content-Type': 'application/json' }
  );
};

// Delete Sponsoring API request
const deleteSponsoring = (sponsorshipId, token) => {
  return makeRequest(
    `/sponsor/${sponsorshipId}`,
    'DELETE',
    { 'Token': token }
  );
};

export {
  getToken,
  registerUser,
  getUser,
  createUser,
  updateUser,
  getFeaturedIdeas,
  submitIdea,
  getIdeaDetails,
  updateProfilePicture,
  getProfilePictureByUsername,
  claimIdea,
  getClaimFromUser,
  getClaimFromAnyUser,
  getClaimFromQuestion,
  deleteClaim,
  sponsorIdea,
  getSponsorshipDetails,
  getSponsorshipsFromUser,
  getSponsorshipsFromAnyUser,
  getSponsorshipsForIdeas,
  deleteSponsoring
};
