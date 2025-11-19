import { useState, useRef, useEffect } from 'react';
import { FaUser, FaSignOutAlt, FaBell } from 'react-icons/fa';
import { useAuth } from '../../../hooks/useAuth'; // ajustá la ruta según tu proyecto
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

const Header = ({ user }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const userRef = useRef(null);
  const notificationsRef = useRef(null);

  const { logout } = useAuth();
  const navigate = useNavigate();

  // Detectar clic fuera del dropdown del usuario y notificaciones
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userRef.current && !userRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setOpenNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();          // limpia token y storage
    navigate('/'); // redirige al login
  };

  const handleProfile = () => {
    navigate('/dashboard/profile')
  }

  return (
    <header className={styles.header}>
      {/* Usuario */}
      <div ref={userRef} className={styles.user} onClick={() => setOpenDropdown(!openDropdown)}>
        <p className={styles.textoLogo}>
          {user?.nombre} {user?.apellido}
          <span className={`${styles.icon} ${openDropdown ? styles.rotate : ''}`}>▼</span>
        </p>

        {openDropdown && (
          <div className={styles.dropdown}>
            <p className={styles.dropdownItem} onClick={handleProfile}>
              <FaUser size={12} /> Perfil
            </p>
            <p className={styles.dropdownItem} onClick={handleLogout}>
              <FaSignOutAlt size={12} /> Salir
            </p>
          </div>
        )}
      </div>

      {/* Notificaciones */}
      <div ref={notificationsRef} className={styles.notificationsWrapper}>
        <div className={styles.notifications} onClick={() => setOpenNotifications(!openNotifications)}>
          <FaBell size={16} className={styles.notificationIcon} />
          <span className={styles.notificationBadge}>3</span>
        </div>

        {openNotifications && (
          <div className={styles.dropdown}>
            <p className={styles.dropdownItem}>Notificación 1</p>
            <p className={styles.dropdownItem}>Notificación 2</p>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;