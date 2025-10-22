import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import styles from './DashboardLayout.module.css';

const DashboardLayout = ({ children, user }) => {
  return (
    <div className={styles.container}>
      <Sidebar /> 
      <div className={styles.content}>
        <Header user={user} /> 
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;