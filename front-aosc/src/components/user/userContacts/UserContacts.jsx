import React from 'react';
import InputField from '../../common/inputField/InputField';
import styles from './UserContacts.module.css';

const UserContacts = ({ contactos = [], readOnly = true }) => (
  <section className={styles.section}>
    <h2>Contactos</h2>
    <div className={styles.contactsGrid}>
      {contactos.map(c => (
        <div key={c.id || Math.random()} className={styles.contactCard}>
          <label>
            Teléfono:
            <InputField value={c.telefono || ''} readOnly={readOnly} />
          </label>

          <label>
            Familiar:
            <InputField value={c.familiar?.nombre || ''} readOnly={readOnly} />
          </label>
        </div>
      ))}
      {/* Si no hay contactos, se puede mostrar un mensaje vacío */}
      {contactos.length === 0 && <p>No hay contactos cargados.</p>}
    </div>
  </section>
);


export default UserContacts;