const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// Helper genérico para peticiones
export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem("token"); // opcional si manejás tokens

  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const config = {
    method: 'GET',
    headers: { ...defaultHeaders, ...options.headers },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Error ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    // Si el servidor no responde o no hay conexión
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('No se pudo conectar con el servidor. Verificá tu conexión o intenta más tarde.');
    }

    // Re-lanzamos cualquier otro error para manejarlo donde se llame a apiRequest
    throw error;
  }
};