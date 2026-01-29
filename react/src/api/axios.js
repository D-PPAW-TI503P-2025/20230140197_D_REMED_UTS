import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5001/api',
});

// Add a request interceptor to include auth headers
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            config.headers['x-user-id'] = user.id;
            config.headers['x-user-role'] = user.role;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
