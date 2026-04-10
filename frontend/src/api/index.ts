import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('wedding_auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - Global Auth Watchdog
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if the server says the session is dead (401 or 403)
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.warn('Authentication expired or invalid. Cleaning up session...');

      // Wipe the dead session from storage
      localStorage.removeItem('wedding_auth_token');
      localStorage.removeItem('wedding_user');

      // Redirect to login ONLY if we're not already there (to avoid infinite refresh)
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
