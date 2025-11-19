import React, { useState, useEffect } from 'react';
import Spinner from '../../common/spinner/Spinner';
import Button from '../../common/button/Button';
import InputField from '../../common/inputField/InputField';
import { educationService } from '../../../services/educationService';
import { useNavigate } from 'react-router-dom';
import styles from './UserEducation.module.css';


// Convierte cualquier fecha a formato YYYY-MM-DD para inputs tipo date
const formatDateForInput = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const UserEducation = ({ usuarioId, readOnly = true }) => {
  const navigate = useNavigate();
  const [estudios, setEstudios] = useState([]);

  const [idiomas, setIdiomas] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!usuarioId) {
          // Si no hay usuarioId, no intento cargar datos
          setEstudios([]);
          setIdiomas([]);
          return;
        }

        const estudiosData = await educationService.getEstudiosPorUsuario(usuarioId);
        const idiomasData = await educationService.getIdiomasPorUsuario(usuarioId);
        setEstudios(estudiosData || []);
        setIdiomas(idiomasData || []);
      } catch (err) {
        console.error('Error al cargar datos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [usuarioId]);

  const handleRemoveIdioma = (index) => {
    setIdiomas(idiomas.filter((_, i) => i !== index));
  };

  const handleAddEstudio = () => {
    navigate('/dashboard/create-education');
  };

  const handleAddIdioma = () => {
    setIdiomas([...idiomas, { nombre: '', nivel: '' }]);
  };

  if (loading) return <Spinner />;

  return (
    <div className={styles.educationContainer}>
      <h3 className={styles.educationTitle}>
        Estudios
      </h3>
      {/* --- Estudios --- */}
      {estudios.length > 0 ? (
        estudios.map((estudio, index) => (
          <div key={index} className={styles.educationCard}>
            <h3 className={styles.educationTitle}>
              {estudio.tipoEstudio?.nombre || 'Tipo de estudio'}
            </h3>

            <div className={styles.studyRow}>
              <div className={styles.inputFieldWrapperFull}>
                <InputField label="Institución" value={estudio.institucion || ''} readOnly />
              </div>
              <div className={styles.inputFieldWrapperDate}>
                <InputField
                  label="Fecha de inicio"
                  type="date"
                  value={estudio.fechaInicio ? formatDateForInput(estudio.fechaInicio) : ''}
                  readOnly
                />
              </div>
              <div className={styles.inputFieldWrapperDate}>
                <InputField
                  label="Fecha de finalización"
                  type="date"
                  value={estudio.fechaFin ? formatDateForInput(estudio.fechaFin) : ''}
                  readOnly
                />
              </div>
            </div>

            {estudio.certificado && (
              <div className={styles.studyRow}>
                <div className={styles.inputFieldWrapperFull}>
                  <InputField label="Certificado" value={estudio.certificado.nombre || ''} readOnly />
                </div>
                <div className={styles.inputFieldWrapperDate}>
                  <InputField
                    label="Fecha de expedición"
                    type="date"
                    value={estudio.certificado.fechaExpedicion ? formatDateForInput(estudio.certificado.fechaExpedicion) : ''}
                    readOnly
                  />
                </div>
                {estudio.certificado?.pdfUrl && (
                  <div className={styles.buttonWrapper}>
                    <Button
                      className={styles.viewButton}
                      onClick={() => window.open(estudio.certificado.pdfUrl, '_blank')}
                    >
                      Ver Certificado
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <div className={styles.noData}>
          <p>No hay estudios cargados aún.</p>
          {!readOnly && (
            <Button className={styles.addButton} onClick={handleAddEstudio}>
              + Agregar estudio
            </Button>
          )}
        </div>
      )}

      {/* Sección de idiomas */}
      <div className={styles.educationCard}>
        <h3 className={styles.educationTitle}>Idiomas</h3>

        <div className={styles.languagePillsContainer}>
          {idiomas.length > 0 ? (
            idiomas.map((idioma, index) => (
              <div key={index} className={styles.languagePill}>
                <span>{`${idioma.nombre || 'Idioma'} – ${idioma.nivel || 'Nivel'}`}</span>
                {!readOnly && (
                  <button
                    className={styles.removePillButton}
                    onClick={() => handleRemoveIdioma(index)}
                  >
                    ×
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className={styles.noData}>
              <p className={styles.textIdioma}>No hay idiomas cargados aún.</p>
            </div>
          )}

          {!readOnly && (
            <button className={styles.addPillButton} onClick={handleAddIdioma}>
              + Añadir
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserEducation;