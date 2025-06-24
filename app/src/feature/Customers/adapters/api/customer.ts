import axios from 'axios';

// Axios instance
const customerApi = axios.create({
  baseURL: '/api', // Gerekirse değiştirin
});

// Request interceptor
customerApi.interceptors.request.use(
  (config) => {
    // Örneğin: Token ekleme
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
customerApi.interceptors.response.use(
  (response) => response,
  (error) => {
    // Hata yönetimi örneği
    // if (error.response?.status === 401) {
    //   // Oturum süresi dolduysa yönlendirme veya logout
    // }
    return Promise.reject(error);
  }
);

export {customerApi};
