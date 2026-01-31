import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

api.interceptors.request.use(config => {
  const auth = JSON.parse(localStorage.getItem('auth'));
  if (auth?.role) config.headers['x-user-role'] = auth.role;
  if (auth?.userId) config.headers['x-user-id'] = auth.userId;
  return config;
});

export default api;
