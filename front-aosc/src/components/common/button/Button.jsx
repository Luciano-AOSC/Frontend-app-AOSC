import styles from "./Button.module.css";

const Button = ({
  children,
  type = "button",
  onClick,
  disabled,
  className = "",
}) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${className} ${disabled ? styles.disabled : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;