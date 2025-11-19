import React, { useState, useEffect } from 'react';
import UserBasicInfo from '../userBasicInfo/UserBasicInfo';
import UserFamily from '../userFamily/UserFamily';
import UserEducation from '../userEducation/UserEducation';
import { familiarService } from '../../../services/familiarService';
import { datoPersonalService } from '../../../services/datoPersonalService';
import Button from '../../common/button/Button';
import styles from './UserProfile.module.css';

const UserProfile = ({ datoPersonal = {}, readOnly = true }) => {
  const [datoPersonalEditable, setDatoPersonalEditable] = useState(datoPersonal);
  const [activeTab, setActiveTab] = useState('basic');
  const [familiares, setFamiliares] = useState([]);
  const [loadingFamily, setLoadingFamily] = useState(false);

  const tabs = [
    { id: 'basic', label: 'Información Básica' },
    { id: 'family', label: 'Familiares' },
    { id: 'education', label: 'Estudios' },
  ];

  // 🔄 Carga perezosa de familiares
  useEffect(() => {
    const loadFamiliares = async () => {
      if (activeTab === 'family' && datoPersonal.familiarIds?.length && familiares.length === 0) {
        try {
          setLoadingFamily(true);
          const data = await familiarService.obtenerPorIds(
            datoPersonal.usuarioId,
            datoPersonal.familiarIds
          );
          setFamiliares(data);
        } catch (err) {
          console.error('Error al cargar familiares:', err);
        } finally {
          setLoadingFamily(false);
        }
      }
    };

    loadFamiliares();
  }, [activeTab, datoPersonal, familiares.length]);

  const handleSaveBasicInfo = async () => {
    // ⛔ 1) Verificar que el hijo pasó la función validate()
    if (datoPersonalEditable.validate) {
      const isValid = datoPersonalEditable.validate();
      if (!isValid) {
        // Cortar acá si hay errores
        return;
      }
    }

    // ⛔ Si no hay validate, no se guarda (seguridad extra)
    else {
      console.error("❌ No se encontró la función validate en los datos.");
      return;
    }

    const data = {
      usuario: {
        correoElectronico: datoPersonalEditable.email?.correoElectronico?.trim() || '',
        contrasena: null,
      },
      nacimiento: {
        fecha: datoPersonalEditable.nacimiento?.fecha || new Date().toISOString(),
        pais: datoPersonalEditable.nacimiento?.pais?.trim() || '', 
        provincia: datoPersonalEditable.nacimiento?.provincia?.trim() || '',
        ciudad: datoPersonalEditable.nacimiento?.ciudad?.trim() || '',
      },
      domicilio: {
        barrio: datoPersonalEditable.domicilio?.barrio?.trim() || '',
        calle: datoPersonalEditable.domicilio?.calle?.trim() || '',
        altura: datoPersonalEditable.domicilio?.altura || 0,
        tipoDomicilio: datoPersonalEditable.domicilio?.tipoDomicilio?.trim() || '',
        ciudad: datoPersonalEditable.domicilio?.ciudad?.trim() || '',
        provincia: datoPersonalEditable.domicilio?.provincia?.trim() || '',
        pais: datoPersonalEditable.domicilio?.pais?.trim() || '',
      },
      nombre: datoPersonalEditable.nombre?.trim() || '',
      apellido: datoPersonalEditable.apellido?.trim() || '',
      estadoCivil: datoPersonalEditable.estadoCivil?.trim() || '',
      dni: datoPersonalEditable.dni?.trim() || '',
      profesion: datoPersonalEditable.profesion?.trim() || '',
      turno: datoPersonalEditable.turno || null,
    };

    try {
      const response = await datoPersonalService.crearCompleto(data);
      console.log('✅ Guardado correctamente:', response);
      alert('Cambios guardados correctamente.');
    } catch (error) {
      console.error('❌ Error al guardar:', error);
      alert('Error al guardar los cambios.');
    }
  };

  return (
    <div className={styles.profileWrapper}>
      {/* Tabs */}
      <div className={styles.tabs}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido */}
      <div className={styles.tabContent}>
        {activeTab === 'basic' && (
          <UserBasicInfo
            readOnly={readOnly}
            datoPersonal={datoPersonal}
            nacimiento={datoPersonal.nacimiento || {}}
            domicilio={datoPersonal.domicilio || {}}
            telefono={datoPersonal.telefono || {}}
            email={datoPersonal.email || {}}
            onSave={(data) => setDatoPersonalEditable(data)}
          />
        )}

        {activeTab === 'family' && (
          loadingFamily ? (
            <p>Cargando familiares...</p>
          ) : (
            <UserFamily familiares={familiares} readOnly={readOnly}/>
          )
        )}

        {activeTab === 'education' && (
          <UserEducation usuarioId={datoPersonal.usuarioId} readOnly={readOnly}/>
        )}
      </div>

      {!readOnly && (
        <div className={styles.buttonContainer}>
          {activeTab === 'basic' && (
            <Button className={styles.saveButton} onClick={handleSaveBasicInfo}>Guardar cambios</Button>
          )}
          {activeTab === 'family' && (
            <Button className={styles.saveButton}>Guardar cambios</Button>
          )}
          {activeTab === 'education' && (
            <Button className={styles.saveButton}>Guardar cambios</Button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;