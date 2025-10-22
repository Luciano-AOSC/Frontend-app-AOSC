import React from "react";
import styles from "./Message.module.css";

const Message = ({ type = "error", text }) => {
  if (!text) return null;

  const className = `${styles.message} ${
    type === "success" ? styles.success : styles.error
  }`;

  return <p className={className}>{text}</p>;
};

export default Message;