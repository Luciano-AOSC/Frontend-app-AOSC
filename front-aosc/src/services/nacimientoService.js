import { apiRequest } from './api';

export const nacimientoService = {
  getById: (id) => apiRequest(`/nacimientos/${id}`),

  crear: (data) =>
    apiRequest('/nacimientos', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  actualizar: (data) =>
    apiRequest('/nacimientos', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  eliminar: (id) =>
    apiRequest(`/nacimientos/${id}`, {
      method: 'DELETE',
    }),
};
