import React from "react";
import styles from "./Spinner.module.css";

const SpinnerOverlay = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default SpinnerOverlay;