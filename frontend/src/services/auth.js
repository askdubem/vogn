import api from './api';

export const authService = {
  register: (data)            => api.post('/auth/register', data),
  login:    (data)            => api.post('/auth/login', data),
  getMe:    ()                => api.get('/auth/me'),
  updateMe: (data)            => api.put('/auth/me', data),
  changePassword: (data)      => api.put('/auth/change-password', data),
};
