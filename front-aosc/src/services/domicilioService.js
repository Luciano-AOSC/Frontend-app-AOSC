import { apiRequest } from './api';

export const domicilioService = {
  // Obtener todos los domicilios
  getAll: () => apiRequest('/domicilios'),

  // Obtener un domicilio por ID
  getById: (id) => apiRequest(`/domicilios/${id}`),

  // Crear un nuevo domicilio
  crear: (data) =>
    apiRequest('/domicilios', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Actualizar un domicilio existente
  actualizar: (data) =>
    apiRequest('/domicilios', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Eliminar un domicilio por ID
  eliminar: (id) =>
    apiRequest(`/domicilios/${id}`, {
      method: 'DELETE',
    }),
};