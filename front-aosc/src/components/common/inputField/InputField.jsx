import styles from "./InputField.module.css";

const InputField = ({ type = "text", placeholder, value, onChange, required, readOnly = false }) => {
  return (
    <input
      className={styles.input}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      readOnly={readOnly} 
    />
  );
};

export default InputField;