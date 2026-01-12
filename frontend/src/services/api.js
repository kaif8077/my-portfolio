import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ Automatic Railway URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;