import { apiRequest } from './api';

// ----------------- DATOS PERSONALES -----------------

// Traer todos los datos personales (solo si el usuario tiene permiso)
export const getAllDatosPersonales = async () => {
  return await apiRequest('/dato-personal');
};

// Traer dato personal por su ID
export const getDatoPersonalById = async (id) => {
  return await apiRequest(`/dato-personal/${id}`);
};

// Traer dato personal por usuario ID
export const getDatoPersonalByUsuarioId = async (usuarioId) => {
  return await apiRequest(`/dato-personal/usuario/${usuarioId}`);
};

// Crear un nuevo dato personal
export const crearDatoPersonal = async (crearDTO) => {
  return await apiRequest('/dato-personal', {
    method: 'POST',
    body: JSON.stringify(crearDTO),
  });
};

// Actualizar dato personal
export const actualizarDatoPersonal = async (actualizarDTO) => {
  return await apiRequest('/dato-personal', {
    method: 'PUT',
    body: JSON.stringify(actualizarDTO),
  });
};

// Eliminar dato personal
export const eliminarDatoPersonal = async (id) => {
  return await apiRequest(`/dato-personal/${id}`, {
    method: 'DELETE',
  });
};

// ----------------- FOTO Y FIRMA -----------------

// Actualizar foto del usuario
export const actualizarFoto = async (id, file) => {
  const formData = new FormData();
  formData.append('file', file);

  return await apiRequest(`/dato-personal/foto/${id}`, {
    method: 'PUT',
    body: formData,
    headers: {}, // no ponemos Content-Type, fetch lo maneja automáticamente para FormData
  });
};

//Obtener foto del usuario
export const getFotoUsuario = async (usuarioId) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem("token");

  const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/datos-personales/foto/${usuarioId}`, {
    method: 'GET',
    headers: {
      ...(token && { Authorization: `Bearer ${token}` })
    }
  });

  if (!response.ok) {
    throw new Error('No se pudo obtener la foto del usuario');
  }

  // Retorna un Blob, que luego React puede convertir en URL para <img>
  return await response.blob();
};

// Actualizar firma digital del usuario
export const actualizarFirma = async (firmaActualizarDTO, file) => {
  const formData = new FormData();
  formData.append('firma', JSON.stringify(firmaActualizarDTO));
  formData.append('file', file);

  return await apiRequest('/dato-personal/firma', {
    method: 'PUT',
    body: formData,
    headers: {}, 
  });
};