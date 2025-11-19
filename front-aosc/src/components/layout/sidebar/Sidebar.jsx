import { useState } from 'react';
import { Link } from "react-router-dom";
import logoAosc from '../../../assets/img/Aosc-blanco.png';
import { 
  FaUser, 
  FaPlus, 
  FaUserShield, 
  FaEye, 
  FaAngleDoubleLeft, 
  FaAngleDoubleRight, 
  FaLock, 
  FaKey 
} from 'react-icons/fa';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openSecurityMenu, setOpenSecurityMenu] = useState(false);
  const [openLicensesMenu, setOpenLicensesMenu] = useState(false);

  return (
    <div className={styles.sidebarWrapper}>
      <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
        {/* Logo */}
        {!collapsed && (
          <Link to="/dashboard" className={styles.logo}>
            <img src={logoAosc} alt="AOSC" />
          </Link>
        )}

        {/* === Menú Usuario === */}
        <button
          className={`${styles.menuItem} ${openUserMenu ? styles.open : ''}`}
          onClick={() => setOpenUserMenu(!openUserMenu)}
        >
          <FaUser size={14} className={styles.icon} />
          {!collapsed && <span>Usuario</span>}
        </button>

        {!collapsed && openUserMenu && (
          <div className={styles.subMenu}>
            <Link to="/dashboard/create-user" className={styles.subMenuItem}>
              <FaPlus size={14} className={styles.icon} /> Agregar Usuario
            </Link>
            <Link to="/dashboard/view-user" className={styles.subMenuItem}>
              <FaEye size={14} className={styles.icon} /> Ver Información
            </Link>
          </div>
        )}

        {/* === Menú Seguridad === */}
        <button
          className={`${styles.menuItem} ${openSecurityMenu ? styles.open : ''}`}
          onClick={() => setOpenSecurityMenu(!openSecurityMenu)}
        >
          <FaLock size={14} className={styles.icon} />
          {!collapsed && <span>Seguridad</span>}
        </button>

        {!collapsed && openSecurityMenu && (
          <div className={styles.subMenu}>
            <Link to="/dashboard/security-roles" className={styles.subMenuItem}>
              <FaUserShield size={14} className={styles.icon} /> Roles y Permisos
            </Link>
            <Link to="/dashboard/security-logs" className={styles.subMenuItem}>
              <FaEye size={14} className={styles.icon} /> Auditoría
            </Link>
          </div>
        )}

        {/* === Menú Licencias === */}
        <button
          className={`${styles.menuItem} ${openLicensesMenu ? styles.open : ''}`}
          onClick={() => setOpenLicensesMenu(!openLicensesMenu)}
        >
          <FaKey size={14} className={styles.icon} />
          {!collapsed && <span>Licencias</span>}
        </button>

        {!collapsed && openLicensesMenu && (
          <div className={styles.subMenu}>
            <Link to="/dashboard/licenses-active" className={styles.subMenuItem}>
              <FaEye size={14} className={styles.icon} /> Licencias Activas
            </Link>
            <Link to="/dashboard/licenses-request" className={styles.subMenuItem}>
              <FaPlus size={14} className={styles.icon} /> Solicitar Licencia
            </Link>
          </div>
        )}
      </aside>

      {/* Flecha lateral */}
      <button
        className={styles.toggleArrow}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <FaAngleDoubleRight size={16} /> : <FaAngleDoubleLeft size={16} />}
      </button>
    </div>
  );
};

export default Sidebar;