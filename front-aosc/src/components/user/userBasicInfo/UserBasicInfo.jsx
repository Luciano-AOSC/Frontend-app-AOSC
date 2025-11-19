import React, { useEffect, useState, useRef, useCallback } from 'react';
import InputField from '../../common/inputField/InputField';
import styles from './UserBasicInfo.module.css';
import defaultImage from '../../../assets/img/Usuario.png';
import { datoPersonalService } from '../../../services/datoPersonalService'; 
import { FiCamera, FiUpload, FiEye, FiTrash2 } from 'react-icons/fi';

const UserBasicInfo = ({
  datoPersonal = {},
  nacimiento = {},
  domicilio = {},
  telefono = {},
  email = {},
  readOnly = true,
  onFotoChange,
  onSave
}) => {
  const [errors, setErrors] = useState({});
  const [fotoUrl, setFotoUrl] = useState(defaultImage);
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editableData, setEditableData] = useState({
    ...datoPersonal,
    nacimiento: { ...nacimiento },
    domicilio: { ...domicilio },
    telefono: { ...telefono },
    email: { ...email },
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    // ❗ Solo sincronizamos cuando NO estamos editando
    if (readOnly) {
      setEditableData({
        ...datoPersonal,
        nacimiento: { ...nacimiento },
        domicilio: { ...domicilio },
        telefono: { ...telefono },
        email: { ...email },
      });

      // Foto
      if (datoPersonal.usuarioId) {
        datoPersonalService.getFoto(datoPersonal.usuarioId)
          .then(blob => setFotoUrl(URL.createObjectURL(blob)))
          .catch(() => setFotoUrl(defaultImage));
      } else {
        setFotoUrl(defaultImage);
      }
    }
  }, [datoPersonal, nacimiento, domicilio, telefono, email, readOnly]);

  // ✅ Validación de campos requeridos
  const validateFields = useCallback(() => {
    const newErrors = {};

    // 🔹 Básicos
    if (!editableData.nombre?.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!editableData.apellido?.trim()) newErrors.apellido = "El apellido es obligatorio";
    if (!editableData.dni?.trim()) newErrors.dni = "El DNI es obligatorio";

    // 🔹 Email
    if (!editableData.email?.correoElectronico?.trim()) {
      newErrors.correoElectronico = "El correo electrónico es obligatorio";
    }

    // 🔹 Nacimiento
    if (!editableData.nacimiento?.fecha) newErrors.fecha = "La fecha es obligatoria";
    if (!editableData.nacimiento?.pais?.trim()) newErrors.pais = "El país es obligatorio";
    if (!editableData.nacimiento?.provincia?.trim()) newErrors.provincia = "La provincia es obligatoria";

    // 🔹 Domicilio
    if (!editableData.domicilio?.tipoDomicilio?.trim()) newErrors.tipoDomicilio = "El tipo de domicilio es obligatorio";
    if (!editableData.domicilio?.ciudad?.trim()) newErrors.ciudadDomicilio = "La ciudad es obligatoria";
    if (!editableData.domicilio?.provincia?.trim()) newErrors.provinciaDomicilio = "La provincia es obligatoria";
    if (!editableData.domicilio?.pais?.trim()) newErrors.paisDomicilio = "El país es obligatorio";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [editableData]);

  // 🧩 Esta función se ejecutará cuando se guarde (viene del padre)
  useEffect(() => {
    if (onSave) onSave({ ...editableData, validate: validateFields });
  }, [editableData, onSave, validateFields]);

  const handleClickUpload = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFotoUrl(URL.createObjectURL(file));
      if (onFotoChange) onFotoChange(file);
      setMenuOpen(false);
    }
  };

  const handleInputChange = (section, field, value) => {
    if (section) {
      setEditableData({
        ...editableData,
        [section]: { ...editableData[section], [field]: value }
      });
    } else {
      setEditableData({ ...editableData, [field]: value });
    }
  };

  return (
    <section className={styles.section}>
      

      {/* Perfil */}
      <div className={styles.userProfile}>
        <div
          className={styles.imageWrapper}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => { setHovered(false); setMenuOpen(false); }}
        >
          <img src={fotoUrl} alt="Foto del usuario" className={styles.userImage} />

          {hovered && !menuOpen && !readOnly && (
            <div className={styles.overlay} onClick={() => setMenuOpen(true)}>
              <p className={styles.overlayText}>
                <FiCamera size={40} style={{ marginRight: '6px' }} /> Cambiar foto del perfil
              </p>
            </div>
          )}

          {menuOpen && (
            <div className={styles.menu}>
              <button onClick={handleClickUpload}><FiUpload style={{ marginRight: '8px' }} /> Subir foto</button>
              <button onClick={() => alert('Ver foto (por implementar)')}><FiEye style={{ marginRight: '8px' }} /> Ver foto</button>
              <button
                className={styles.deleteButton}  
                onClick={() => {
                  setFotoUrl(defaultImage);
                  if (onFotoChange) onFotoChange(null);
                  setMenuOpen(false);
                }}
              >
                <FiTrash2 style={{ marginRight: '8px' }} /> Eliminar foto
              </button>
            </div>
          )}

          <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={handleFileChange} />
        </div>

        {readOnly ? (
          <h3 className={styles.userName}>
            {`${datoPersonal.nombre || 'Nombre'} ${datoPersonal.apellido || 'Apellido'}`}
          </h3>
        ) : null}
      </div>

      <p className={styles.infoObligatorios}>Los campos marcados con <span className={styles.required}>*</span> son obligatorios</p>

      {/* Información Básica */}
      <h2>Información Básica</h2>
      <div className={styles.infoGrid}>
        <label>
          <p>Nombre: <span className={styles.required}>*</span></p>
          {errors.nombre && <p className={styles.error}>{errors.nombre || ""}</p>}
          <InputField
            value={editableData.nombre || ''}
            readOnly={readOnly}
            placeholder="Nombre"
            onChange={(e) => handleInputChange(null, 'nombre', e.target.value)}
          />
        </label>

        <label>
          <p>Apellido: <span className={styles.required}>*</span></p>
          {errors.apellido && <p className={styles.error}>{errors.apellido || ""}</p>}
          <InputField
            value={editableData.apellido || ''}
            readOnly={readOnly}
            placeholder="Apellido"
            onChange={(e) => handleInputChange(null, 'apellido', e.target.value)}
          />
        </label>

        <label>
          <p>DNI: <span className={styles.required}>*</span></p>
          {errors.dni && <p className={styles.error}>{errors.dni || ""}</p>}
          <InputField
            value={editableData.dni || ''}
            readOnly={readOnly}
            onChange={(e) => handleInputChange(null, 'dni', e.target.value)}
          />
        </label>

        <label>
          <p>Estado Civil:</p>
          {errors.paisDomicilio && <p className={styles.error}>{""}</p>}
          <select
            className={styles.input}
            value={editableData.estadoCivil || ''}
            onChange={(e) => handleInputChange(null, 'estadoCivil', e.target.value)}
            disabled={readOnly}
          >
            <option value="">Seleccione una opción</option>
            <option value="SOLTERO">Soltero/a</option>
            <option value="CASADO">Casado/a</option>
            <option value="DIVORCIADO">Divorciado/a</option>
            <option value="VIUDO">Viudo/a</option>
            <option value="SEPARADO">Separado/a</option>
            <option value="UNION LIBRE">Unión Libre</option>
            <option value="UNION CIVIL">Unión Civil</option>
          </select>
        </label>

        <label>
          <p>Profesión:</p>
          {errors.paisDomicilio && <p className={styles.error}>{""}</p>}
          <InputField
            value={editableData.profesion || ''}
            readOnly={readOnly}
            onChange={(e) => handleInputChange(null, 'profesion', e.target.value)}
          />
        </label>
      </div>

      {/* Datos de contacto */}
      <h2>Datos de contacto</h2>
      <div className={styles.infoGrid}>
        <label>
          <p>Teléfono:</p>
          {errors.paisDomicilio && <p className={styles.error}>{""}</p>}
          <InputField
            value={editableData.telefono?.contacto || ''}
            readOnly={readOnly}
            onChange={(e) => handleInputChange('telefono', 'contacto', e.target.value)}
          />
        </label>
        <label>
          <p>Correo: <span className={styles.required}>*</span></p>
          {errors.correoElectronico && <p className={styles.error}>{errors.correoElectronico || ""}</p>}
          <InputField
            value={editableData.email?.correoElectronico || ''}
            readOnly={readOnly}
            onChange={(e) => handleInputChange('email', 'correoElectronico', e.target.value)}
          />
        </label>
      </div>

      {/* Nacimiento */}
      <h2>Nacimiento</h2>
      <div className={styles.infoGrid}>
        <label>
          <p>Fecha de Nacimiento: <span className={styles.required}>*</span></p>
          {errors.fecha && <p className={styles.error}>{errors.fecha || ""}</p>}
          <InputField
            type="date"
            value={editableData.nacimiento?.fecha ? new Date(editableData.nacimiento.fecha).toISOString().split('T')[0] : ''}
            readOnly={readOnly}
            onChange={(e) => handleInputChange('nacimiento', 'fecha', e.target.value)}
          />
        </label>
        <label>
          <p>País: <span className={styles.required}>*</span></p>
          {errors.pais && <p className={styles.error}>{errors.pais || ""}</p>}
          <InputField
            value={editableData.nacimiento?.pais || ''}
            readOnly={readOnly}
            onChange={(e) => handleInputChange('nacimiento', 'pais', e.target.value)}
          />
        </label>
        <label>
          <p>Provincia: <span className={styles.required}>*</span></p>
          {errors.provincia && <p className={styles.error}>{errors.provincia || ""}</p>}
          <InputField
            value={editableData.nacimiento?.provincia || ''}
            readOnly={readOnly}
            onChange={(e) => handleInputChange('nacimiento', 'provincia', e.target.value)}
          />
        </label>
        <label>
          <p>Ciudad:</p>
          {errors.paisDomicilio && <p className={styles.error}>{""}</p>}
          <InputField
            value={editableData.nacimiento?.ciudad || ''}
            readOnly={readOnly}
            onChange={(e) => handleInputChange('nacimiento', 'ciudad', e.target.value)}
          />
        </label>
      </div>

      {/* Domicilio */}
      <h2>Domicilio</h2>
      <div className={styles.infoGrid}>
        <label>
          <p>Tipo de Domicilio: <span className={styles.required}>*</span></p>
          {errors.tipoDomicilio && <p className={styles.error}>{errors.tipoDomicilio || ""}</p>}
          <InputField
            value={editableData.domicilio?.tipoDomicilio || ''}
            readOnly={readOnly}
            onChange={(e) => handleInputChange('domicilio', 'tipoDomicilio', e.target.value)}
          />
        </label>
        <label>
          <p>Ciudad: <span className={styles.required}>*</span></p>
          {errors.ciudadDomicilio && <p className={styles.error}>{errors.ciudadDomicilio || ""}</p>}
          <InputField
            value={editableData.domicilio?.ciudad || ''}
            readOnly={readOnly}
            onChange={(e) => handleInputChange('domicilio', 'ciudad', e.target.value)}
          />
        </label>
        <label>
          <p>Provincia: <span className={styles.required}>*</span></p>
          {errors.provinciaDomicilio && <p className={styles.error}>{errors.provinciaDomicilio || ""}</p>}
          <InputField
            value={editableData.domicilio?.provincia || ''}
            readOnly={readOnly}
            onChange={(e) => handleInputChange('domicilio', 'provincia', e.target.value)}
          />
        </label>
        <label>
          <p>País: <span className={styles.required}>*</span></p>
          {errors.paisDomicilio && <p className={styles.error}>{errors.paisDomicilio || ""}</p>}
          <InputField
            value={editableData.domicilio?.pais || ''}
            readOnly={readOnly}
            onChange={(e) => handleInputChange('domicilio', 'pais', e.target.value)}
          />
        </label>
      </div>
    </section> 
  );
};

export default UserBasicInfo;