import axios from 'axios';

// Determine API URL based on environment
const getApiUrl = () => {
  // For production (Vercel)
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_API_URL || 'https://my-portfolio-production-604f.up.railway.app/api';
  }
  // For development
  return import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
};

const API = axios.create({
  baseURL: getApiUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 seconds timeout
});

// Request interceptor for logging
API.interceptors.request.use(
  (config) => {
    // Log requests in development
    if (import.meta.env.DEV) {
      console.log(`API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    }
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => {
    // Log responses in development
    if (import.meta.env.DEV) {
      console.log(`API Response: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'Something went wrong. Please try again.';
    
    console.error('API Error:', {
      message: errorMessage,
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data
    });
    
    // Show user-friendly error message
    if (error.response?.status === 401) {
      console.error('Authentication error - please login again');
    } else if (error.response?.status === 500) {
      console.error('Server error - please try again later');
    }
    
    return Promise.reject(error);
  }
);

// Contact API methods
export const contactAPI = {
  submitContact: (data) => API.post('/contact/submit', data),
  getAllContacts: (token) => API.get('/contact/all', {
    headers: { Authorization: `Bearer ${token}` }
  }),
  deleteContact: (id, token) => API.delete(`/contact/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
};

// Auth API methods
export const authAPI = {
  login: (data) => API.post('/auth/login', data),
  createAdmin: (data) => API.post('/auth/create', data)
};

// Health check
export const healthCheck = () => API.get('/health');

export default API;