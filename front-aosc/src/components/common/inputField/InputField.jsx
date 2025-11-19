import styles from "./InputField.module.css";

const InputField = ({
  type = "text",
  placeholder,
  value,
  onChange,
  required,
  readOnly = false,
  label,
  className = ""
}) => {
  return (
    <div className={styles.inputWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={`${styles.input} ${className}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        readOnly={readOnly}
      />
    </div>
  );
};

export default InputField;