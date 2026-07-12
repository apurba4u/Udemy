import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== 'undefined' && error.response) {
      const status = error.response.status;
      const message = error.response.data?.message;

      if (status === 401) {
        localStorage.removeItem('token');
        toast.error('Session expired. Please login again.');
        window.location.href = '/auth/login';
      } else if (status === 429) {
        toast.error('Too many requests. Please try again later.');
      } else if (status === 500) {
        toast.error('Server error. Please try again later.');
      } else if (message && status >= 400 && status < 500) {
        toast.error(message);
      }
    } else if (typeof window !== 'undefined' && !error.response) {
      toast.error('Network error. Please check your connection.');
    }
    return Promise.reject(error);
  }
);

export default api;
