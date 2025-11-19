import { apiRequest } from './api';

export const educationService = {
  // Estudios
  getEstudiosPorUsuario: (usuarioId) =>
    apiRequest(`/estudios/usuario/${usuarioId}`),

  crearEstudio: (data) =>
    apiRequest('/estudios', { method: 'POST', body: JSON.stringify(data) }),

  actualizarEstudio: (data) =>
    apiRequest('/estudios', { method: 'PUT', body: JSON.stringify(data) }),

  eliminarEstudio: (id) =>
    apiRequest(`/estudios/${id}`, { method: 'DELETE' }),

  // Certificados
  getCertificadosPorUsuario: (usuarioId) =>
    apiRequest(`/certificados/usuario/${usuarioId}`),

  crearCertificado: (data) =>
    apiRequest('/certificados', { method: 'POST', body: JSON.stringify(data) }),

  actualizarCertificado: (data) =>
    apiRequest('/certificados', { method: 'PUT', body: JSON.stringify(data) }),

  eliminarCertificado: (id) =>
    apiRequest(`/certificados/${id}`, { method: 'DELETE' }),

  // Idiomas
  getIdiomasPorUsuario: (usuarioId) =>
    apiRequest(`/usuarioIdioma/usuario/${usuarioId}`),

  crearIdioma: (data) =>
    apiRequest('/usuarioIdioma', { method: 'POST', body: JSON.stringify(data) }),

  actualizarIdioma: (data) =>
    apiRequest('/usuarioIdioma', { method: 'PUT', body: JSON.stringify(data) }),

  eliminarIdioma: (id) =>
    apiRequest(`/usuarioIdioma/${id}`, { method: 'DELETE' }),
};