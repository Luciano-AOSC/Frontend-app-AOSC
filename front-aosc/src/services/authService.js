import { apiRequest } from './api';

export const loginUser = (correo, clave) =>
apiRequest('/auth/login', {
  method: 'POST',
  body: JSON.stringify({ login: correo, clave }),
});

export const forgotPasswordRequest = (email) =>
apiRequest('/auth/forgot-password', {
  method: 'POST',
  body: JSON.stringify({ email: email }),
});

export const resetPasswordRequest = (token, contrasena) =>
apiRequest('/auth/reset-password', {
  method: 'POST',
  body: JSON.stringify({ token, contrasena }),
});