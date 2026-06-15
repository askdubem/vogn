import api from './api';

export const categoryService = {
  getAll:    ()          => api.get('/categories'),
  getBySlug: (slug)      => api.get(`/categories/${slug}`),
  create:    (data)      => api.post('/categories', data),
  update:    (id, data)  => api.put(`/categories/${id}`, data),
  delete:    (id)        => api.delete(`/categories/${id}`),
};
