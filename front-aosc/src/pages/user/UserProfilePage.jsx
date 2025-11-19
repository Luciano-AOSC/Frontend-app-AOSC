import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';
import { datoPersonalService } from '../../services/datoPersonalService';
import { contactoService } from '../../services/contactoService';
import { nacimientoService } from '../../services/nacimientoService';
import { domicilioService } from '../../services/domicilioService';
import { authService } from '../../services/authService';
import { useAuth } from '../../hooks/useAuth';
import UserProfile from '../../components/user/userProfile/UserProfile';
import Spinner from '../../components/common/spinner/Spinner'; 

const UserProfilePage = ({readOnly = true}) => {
  const { token } = useAuth();
  const [datoPersonal, setDatoPersonal] = useState({});
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchDatos = async () => {
      if (!token) return;

      try {
        setLoading(true);
        const { id: usuarioId } = jwtDecode(token);

        const personal = await datoPersonalService.getByUsuarioId(usuarioId);

        const [telefono, nacimiento, domicilio, email] = await Promise.all([
          personal.contactoIds?.length
            ? contactoService.getById(personal.contactoIds[0])
            : null,
          personal.nacimientoId
            ? nacimientoService.getById(personal.nacimientoId)
            : null,
          personal.domicilioId
            ? domicilioService.getById(personal.domicilioId)
            : null,
          authService.getUsuarioPorId(personal.usuarioId),
        ]);

        setDatoPersonal({
          ...personal,
          nacimiento,
          telefono,
          domicilio,
          email,
        });
      } catch (err) {
        console.error('Error al obtener datos del usuario:', err);
        setDatoPersonal({});
      } finally {
        setLoading(false);
      }
    };

    fetchDatos();
  }, [token]);

  return (
    <div>
      <h2>Perfil de Usuario</h2>
      {loading ? (
        <Spinner />
      ) : (
        <UserProfile datoPersonal={datoPersonal} readOnly={readOnly}/>
      )}
    </div>
  );
};

export default UserProfilePage;