import axios from 'axios';

// Axios instance
const productApi = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// Request interceptor
productApi.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
productApi.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export {productApi};
