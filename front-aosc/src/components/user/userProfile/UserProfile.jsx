import React, { useState } from 'react';
import UserBasicInfo from '../userBasicInfo/UserBasicInfo';
import UserContacts from '../userContacts/UserContacts';
import UserFamily from '../userFamily/UserFamily';
import styles from './UserProfile.module.css';

const UserProfile = ({ datoPersonal = {} }) => {
  const [activeTab, setActiveTab] = useState('basic');

  const tabs = [
    { id: 'basic', label: 'Información Básica' },
    { id: 'contacts', label: 'Contactos' },
    { id: 'family', label: 'Familiares' },
  ];

  return (
    <div className={styles.profileWrapper}>
      {/* Tabs buttons */}
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

      {/* Tabs content */}
      <div className={styles.tabContent}>
        {activeTab === 'basic' && (
          <UserBasicInfo
            datoPersonal={datoPersonal}
            nacimiento={datoPersonal.nacimiento || {}}
            domicilio={datoPersonal.domicilio || {}}
          />
        )}
        {activeTab === 'contacts' && (
          <UserContacts contactos={datoPersonal.contactos || []} />
        )}
        {activeTab === 'family' && (
          <UserFamily familiares={datoPersonal.familiares || []} />
        )}
      </div>
    </div>
  );
};

export default UserProfile;