import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';
import { getDatoPersonalByUsuarioId } from '../../services/userService';
import { useAuth } from '../../hooks/useAuth';
import UserProfile from '../../components/user/userProfile/UserProfile';

const UserProfilePage = () => {
  const { token } = useAuth();
  const [datoPersonal, setDatoPersonal] = useState({}); // objeto vacío por defecto

  useEffect(() => {
    const fetchDatos = async () => {
      if (!token || typeof token !== 'string') {
        console.warn('Token inválido o no disponible');
        setDatoPersonal({}); // asegurar que la UI se muestre
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const usuarioId = decoded.id;

        const data = await getDatoPersonalByUsuarioId(usuarioId);
        setDatoPersonal(data || {}); // datos vacíos si API falla
      } catch (err) {
        console.error('Error al obtener datos del usuario:', err);
        setDatoPersonal({}); // siempre mostramos UI aunque haya error
      }
    };

    fetchDatos();
  }, [token]);

  return (
    <div>
      <h2>Perfil de Usuario</h2>
      <UserProfile datoPersonal={datoPersonal} readOnly={true} />
    </div>
  );
};

export default UserProfilePage;