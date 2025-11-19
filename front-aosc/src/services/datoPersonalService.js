import { apiRequest } from './api';

export const datoPersonalService = {
  // ------ DATOS PERSONALES ------

  getAll: () => apiRequest('/datos-personales'),

  getById: (id) => apiRequest(`/datos-personales/${id}`),

  getByUsuarioId: (usuarioId) =>
    apiRequest(`/datos-personales/usuario/${usuarioId}`),

  crear: (data) =>
    apiRequest('/datos-personales', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  crearCompleto: (data) =>
    apiRequest('/datos-personales/completo', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  actualizar: (data) =>
    apiRequest('/datos-personales', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  eliminar: (id) =>
    apiRequest(`/datos-personales/${id}`, {
      method: 'DELETE',
    }),

  // ------ FOTO ------

  actualizarFoto: (id, file) => {
    const formData = new FormData();
    formData.append('file', file);

    return apiRequest(`/datos-personales/foto/${id}`, {
      method: 'PUT',
      body: formData,
      headers: {}, // fetch maneja automáticamente el Content-Type para FormData
    });
  },

  getFoto: async (usuarioId) => {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');

    const response = await fetch(
      `${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/datos-personales/foto/${usuarioId}`,
      {
        method: 'GET',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );

    if (!response.ok) {
      throw new Error('No se pudo obtener la foto del usuario');
    }

    return await response.blob(); // devuelve Blob para <img />
  },

  // ------ FIRMA DIGITAL ------

  actualizarFirma: (firmaActualizarDTO, file) => {
    const formData = new FormData();
    formData.append('firma', JSON.stringify(firmaActualizarDTO));
    formData.append('file', file);

    return apiRequest('/datos-personales/firma', {
      method: 'PUT',
      body: formData,
      headers: {},
    });
  },
};