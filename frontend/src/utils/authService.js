// authService.js
const AUTH_USER_KEY = 'authenticatedUser';

// Get authenticated user from localStorage
export const getAuthenticatedUser = () => {
  const user = JSON.parse(localStorage.getItem(AUTH_USER_KEY));
  return user || null;
};

// Set authenticated user in localStorage
export const setAuthenticatedUser = (user) => {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
};

// Clear authenticated user from localStorage
export const clearAuthenticatedUser = () => {
  localStorage.removeItem(AUTH_USER_KEY);
};

// authService.js
export const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};
