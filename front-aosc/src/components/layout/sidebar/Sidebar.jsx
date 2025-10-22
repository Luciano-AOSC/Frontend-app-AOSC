import { useState } from 'react';
import logoAosc from '../../../assets/img/Aosc-blanco.png';
import { FaUser, FaPlus, FaEdit, FaEye, FaChartBar, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={styles.sidebarWrapper}>
      <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
        {/* Logo */}
        {!collapsed && (
          <div className={styles.logo}>
            <img src={logoAosc} alt="AOSC" />
          </div>
        )}

        {/* Menú Usuario */}
        <button
          className={`${styles.menuItem} ${openUserMenu ? styles.open : ''}`}
          onClick={() => setOpenUserMenu(!openUserMenu)}
        >
          <FaUser size={20} className={styles.icon} />
          {!collapsed && <span>Usuario</span>}
        </button>

        {!collapsed && (
          <div className={`${styles.subMenu} ${openUserMenu ? styles.open : ''}`}>
            <p className={styles.subMenuItem}>
              <FaPlus size={14} className={styles.icon} /> Agregar Usuario
            </p>
            <p className={styles.subMenuItem}>
              <FaEdit size={14} className={styles.icon} /> Editar Información
            </p>
            <p className={styles.subMenuItem}>
              <FaEye size={14} className={styles.icon} /> Ver Información
            </p>
          </div>
        )}

        {/* Menú Reportes */}
        <p className={styles.menuItem}>
          <FaChartBar size={20} className={styles.icon} />
          {!collapsed && <span>Reportes</span>}
        </p>
      </aside>

      {/* Flecha lateral arriba */}
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