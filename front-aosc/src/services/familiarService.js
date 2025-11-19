import { apiRequest } from './api';

export const familiarService = {
  // Obtener todos los familiares
  getAll: () => apiRequest('/familiares'),

  // Obtener familiar por ID
  getById: (id) => apiRequest(`/familiares/${id}`),

  // Crear familiar
  crear: (data) =>
    apiRequest('/familiares', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Actualizar familiar
  actualizar: (data) =>
    apiRequest('/familiares', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Eliminar familiar por ID
  eliminar: (id) =>
    apiRequest(`/familiares/${id}`, {
      method: 'DELETE',
    }),

  // ENDPOINTS específicos según el controller

  // Obtener familiares por lista de IDs y usuario
  obtenerPorIds: (usuarioId, familiaresIds) =>
    apiRequest('/familiares/usuario', {
      method: 'POST',
      body: JSON.stringify({
        usuarioId,
        familiaresIds, // [3, 5, 7] por ejemplo
      }),
    }),

  // Obtener hijos de un usuario
  obtenerHijos: (usuarioId) =>
    apiRequest(`/familiares/${usuarioId}/hijos`),

  // Obtener familiares de emergencia de un usuario
  obtenerEmergencias: (usuarioId) =>
    apiRequest(`/familiares/${usuarioId}/emergencias`),

  // Obtener dependientes de un usuario
  obtenerDependientes: (usuarioId) =>
    apiRequest(`/familiares/${usuarioId}/dependientes`),
};