import React, { useEffect, useState, useRef } from 'react';
import InputField from '../../common/inputField/InputField';
import styles from './UserBasicInfo.module.css';
import defaultImage from '../../../assets/img/Usuario.png';
import { getFotoUsuario } from '../../../services/userService';
import { FiCamera, FiUpload, FiEye, FiTrash2 } from 'react-icons/fi';

const UserBasicInfo = ({ datoPersonal = {}, nacimiento = {}, domicilio = {}, contacto = {}, readOnly = true, onFotoChange }) => {
  const [fotoUrl, setFotoUrl] = useState(defaultImage);
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (datoPersonal.usuarioId) {
      getFotoUsuario(datoPersonal.usuarioId)
        .then(blob => setFotoUrl(URL.createObjectURL(blob)))
        .catch(() => setFotoUrl(defaultImage));
    }
  }, [datoPersonal.usuarioId]);

  const handleClickUpload = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFotoUrl(URL.createObjectURL(file));
      if (onFotoChange) onFotoChange(file);
      setMenuOpen(false);
    }
  };

  return (
    <section className={styles.section}>

      {/* Imagen centrada + Nombre y Apellido */}
      <div className={styles.userProfile}>
        <div
          className={styles.imageWrapper}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => { setHovered(false); setMenuOpen(false); }}
        >
          <img src={fotoUrl} alt="Foto del usuario" className={styles.userImage} />

          {/* Overlay con texto al pasar el mouse */}
          {hovered && !menuOpen && (
            <div className={styles.overlay} onClick={() => setMenuOpen(true)}>
              <p className={styles.overlayText}>
                <FiCamera size={40} style={{ marginRight: '6px' }} />
                Cambiar foto del perfil
              </p>
            </div>
          )}

          {/* Menú flotante */}
          {menuOpen && (
            <div className={styles.menu}>
              <button onClick={handleClickUpload}>
                <FiUpload style={{ marginRight: '8px' }} /> Subir foto
              </button>
              <button onClick={() => alert('Ver foto (por implementar)')}>
                <FiEye style={{ marginRight: '8px' }} /> Ver foto
              </button>
              <button
                className={styles.deleteButton}  
                onClick={() => {
                  setFotoUrl(defaultImage);
                  if (onFotoChange) onFotoChange(null);
                  setMenuOpen(false);
              }}>
                <FiTrash2 style={{ marginRight: '8px' }} /> Eliminar foto
              </button>
            </div>
          )}

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        

        <h3 className={styles.userName}>
          {`${datoPersonal.nombre || 'Luciano Emmanuel'} ${datoPersonal.apellido || 'Gatti'}`}
        </h3>
      </div>

      {/* Información Básica */}
      <h2>Información Básica</h2>
      <div className={styles.infoGrid}>
        <label>DNI:<InputField value={datoPersonal.dni || ''} readOnly={readOnly} /></label>
        <label>Estado Civil:<InputField value={datoPersonal.estadoCivil || ''} readOnly={readOnly} /></label>
        <label>Profesión:<InputField value={datoPersonal.profesion || ''} readOnly={readOnly} /></label>
      </div>

      <h2>Datos de contacto</h2>
      <div className={styles.infoGrid}>
        <label>Teléfono:<InputField value={contacto.telefono || ''} readOnly={readOnly} /></label>
        <label>Correo:<InputField value={contacto.email || ''} readOnly={readOnly} /></label>
      </div>

      <h2>Nacimiento</h2>
      <div className={styles.infoGrid}>
        <label>Fecha de Nacimiento:<InputField value={nacimiento.fecha ? new Date(nacimiento.fecha).toLocaleDateString() : ''} readOnly={readOnly} /></label>
        <label>País:<InputField value={nacimiento.pais || ''} readOnly={readOnly} /></label>
        <label>Provincia:<InputField value={nacimiento.provincia || ''} readOnly={readOnly} /></label>
        <label>Ciudad:<InputField value={nacimiento.ciudad || ''} readOnly={readOnly} /></label>
      </div>

      <h2>Domicilio</h2>
      <div className={styles.infoGrid}>
        <label>Domicilio:<InputField value={`${domicilio.calle || ''} ${domicilio.altura || ''}${domicilio.barrio ? `, B° ${domicilio.barrio}` : ''}`} readOnly={readOnly} /></label>
        <label>Ciudad:<InputField value={domicilio.ciudad || ''} readOnly={readOnly} /></label>
        <label>Provincia:<InputField value={domicilio.provincia || ''} readOnly={readOnly} /></label>
        <label>País:<InputField value={domicilio.pais || ''} readOnly={readOnly} /></label>
      </div>
    </section>
  );
};

export default UserBasicInfo;