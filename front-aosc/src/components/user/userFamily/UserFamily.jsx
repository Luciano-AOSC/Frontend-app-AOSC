import React, { useState } from 'react';
import styles from './UserFamily.module.css';
import Button from '../../common/button/Button';
import { FaTrashAlt, FaEdit, FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const UserFamily = ({ familiares = [], readOnly = true, onAddFamiliar }) => {
  const navigate = useNavigate();
  const [listaFamiliares, setListaFamiliares] = useState(familiares);

  const handleRemoveFamiliar = (index) => {
    const confirmDelete = window.confirm('¿Deseas eliminar este familiar?');
    if (confirmDelete) {
      const nuevaLista = listaFamiliares.filter((_, i) => i !== index);
      setListaFamiliares(nuevaLista);
      console.log('Familiar eliminado:', index);
    }
  };

  const handleAddFamiliar = () => {
    navigate('/dashboard/create-familiar');
  }

  const handleViewFamiliar = (index) => {
    const familiar = listaFamiliares[index];
    alert(`
      Nombre: ${familiar.nombre} ${familiar.apellido}
      Vínculo: ${familiar.vinculo?.nombre || 'No especificado'}
      Trabajo: ${familiar.trabajo || '-'}
      Sueldo: ${familiar.sueldoMensual || '-'}
      Observaciones: ${familiar.observaciones || '-'}
      A su cargo: ${familiar.estanASuCargo ? 'Sí' : 'No'}
      Familiar de emergencia: ${familiar.familiarEmergencia ? 'Sí' : 'No'}
      Contacto: ${familiar.contactos?.[0]?.contacto || '-'}
    `);
  };

  return (
    <section className={styles.section}>
      {listaFamiliares.length > 0 ? (
        <div className={styles.tableWrapper}>
          <table className={styles.familyTable}>
            <thead>
              <tr>
                <th>Nombre y Apellido</th>
                <th>Vínculo</th>
                <th>Trabajo</th>
                <th>Sueldo</th>
                <th>Observaciones</th>
                <th>A su cargo</th>
                <th>Familiar Emergencia</th>
                <th>Contacto</th>
                {!readOnly && <th>Opciones</th>}
              </tr>
            </thead>
            <tbody>
              {listaFamiliares.map((f, index) => (
                <tr key={f.id || index}>
                  <td>{`${f.nombre || ''} ${f.apellido || ''}`}</td>
                  <td>{f.vinculo?.nombre || 'No especificado'}</td>
                  <td>{f.trabajo || '-'}</td>
                  <td>{f.sueldoMensual || '-'}</td>
                  <td>{f.observaciones || '-'}</td>
                  <td>{f.estanASuCargo ? 'Sí' : 'No'}</td>
                  <td>{f.familiarEmergencia ? 'Sí' : 'No'}</td>
                  <td>{f.contactos?.[0]?.contacto || '-'}</td>
                  {!readOnly && (
                    <td>
                      <div className={styles.buttonGroup}>
                        <Button
                          className={`${styles.button} ${styles.deleteButton}`}
                          onClick={() => handleRemoveFamiliar(index)}
                        >
                          <FaTrashAlt size={14} style={{ marginRight: "6px" }} />
                          Eliminar
                        </Button>

                        <Button
                          className={`${styles.button} ${styles.infoButton}`}
                          onClick={() => handleViewFamiliar(index)}
                        >
                          <FaEdit size={14} style={{ marginRight: "6px" }} />
                          Editar
                        </Button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={styles.noData}>
          <p>No hay familiares cargados aún.</p>
        </div>
      )}

      {/* ✅ Mostrar el botón SIEMPRE (excepto si está en modo lectura) */}
      {!readOnly && (
        <div className={styles.noData}>
          <Button onClick={handleAddFamiliar} className={styles.addButton}>
            <FaPlus size={14} style={{ marginRight: "6px" }} />
            Agregar familiar
          </Button>
        </div>
      )}
    </section>
  );
};

export default UserFamily;
