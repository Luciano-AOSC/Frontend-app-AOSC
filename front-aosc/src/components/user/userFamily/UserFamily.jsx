import React from 'react';
import InputField from '../../common/inputField/InputField';
import styles from './UserFamily.module.css';

const UserFamily = ({ familiares = [], readOnly = true }) => (
  <section className={styles.section}>
    <h2>Familiares</h2>
    {familiares.map(f => (
      <div key={f.id || Math.random()} className={styles.familyCard}>
        <label>
          Nombre y Apellido:
          <InputField value={`${f.nombre || ''} ${f.apellido || ''}`} readOnly={readOnly} />
        </label>
        <label>
          Vínculo:
          <InputField value={f.vinculo?.nombre || ''} readOnly={readOnly} />
        </label>
        <label>
          Trabajo:
          <InputField value={f.trabajo || ''} readOnly={readOnly} />
        </label>
        <label>
          Sueldo:
          <InputField value={f.sueldoMensual || ''} readOnly={readOnly} />
        </label>
        <label>
          Observaciones:
          <InputField value={f.observaciones || ''} readOnly={readOnly} />
        </label>
        <label>
          Familiar de emergencia:
          <InputField value={f.familiarEmergencia ? 'Sí' : 'No'} readOnly={readOnly} />
        </label>
        <label>
          A su cargo:
          <InputField value={f.estanASuCargo ? 'Sí' : 'No'} readOnly={readOnly} />
        </label>
      </div>
    ))}
    {familiares.length === 0 && <p>No hay familiares cargados.</p>}
  </section>
);

export default UserFamily;