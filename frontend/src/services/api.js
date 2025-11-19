
// src/services/api.js
import axios from 'axios';

<<<<<<< HEAD
const API = axios.create({ baseURL: 'http://localhost:5000/api' });
=======
const API = axios.create({ baseURL: 'http://localhost:31034/api' });
>>>>>>> e8be3ddfcdd9993b7c45e4c4fe9c0f77ccff7b74

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


export default API;
