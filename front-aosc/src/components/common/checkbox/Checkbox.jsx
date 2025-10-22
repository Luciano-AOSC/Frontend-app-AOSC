import React from "react";
import styles from "./Checkbox.module.css";

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <label className={styles.checkboxLabel}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={styles.checkboxInput}
      />
      <span className={styles.checkboxText}>{label}</span>
    </label>
  );
};

export default Checkbox;