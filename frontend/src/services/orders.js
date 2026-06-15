import api from './api';

export const orderService = {
  create:              (data)          => api.post('/orders', data),
  getAll:              (params)        => api.get('/orders', { params }),
  getById:             (id)            => api.get(`/orders/${id}`),
  getByNumber:         (num)           => api.get(`/orders/number/${num}`),
  updateStatus:        (id, status)    => api.put(`/orders/${id}/status`, { status }),
  updatePayment:       (id, data)      => api.put(`/orders/${id}/payment`, data),
  delete:              (id)            => api.delete(`/orders/${id}`),
};
