import api from './api';

export const productService = {
  getAll:      (params)  => api.get('/products', { params }),
  getBySlug:   (slug)    => api.get(`/products/${slug}`),
  getById:     (id)      => api.get(`/products/id/${id}`),
  getRelated:  (id)      => api.get(`/products/${id}/related`),
  create:      (data)    => api.post('/products', data),
  update:      (id, data)=> api.put(`/products/${id}`, data),
  delete:      (id)      => api.delete(`/products/${id}`),
};
