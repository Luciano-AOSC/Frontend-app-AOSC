import { apiRequest } from './api';

export const authService = {
  // Obtener usuario por ID
  getUsuarioPorId: (id) => apiRequest(`/usuarios/${id}`),

  // Iniciar sesión
  login: (correo, clave) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ login: correo, clave }),
    }),

  // Enviar email para recuperar contraseña
  forgotPassword: (email) =>
    apiRequest('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  // Restablecer contraseña con token
  resetPassword: (token, contrasena) =>
    apiRequest('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, contrasena }),
    }),
};