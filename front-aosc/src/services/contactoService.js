import { apiRequest } from './api';

export const contactoService = {
  getById: (id) => apiRequest(`/contactos/${id}`),

  crear: (data) =>
    apiRequest('/contactos', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  actualizar: (data) =>
    apiRequest('/contactos', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  eliminar: (id) =>
    apiRequest(`/contactos/${id}`, {
      method: 'DELETE',
    }),

  // Endpoints extra
  getUsuarios: () => apiRequest('/contactos/usuarios'),

  getFamiliares: () => apiRequest('/contactos/familiares'),
};
