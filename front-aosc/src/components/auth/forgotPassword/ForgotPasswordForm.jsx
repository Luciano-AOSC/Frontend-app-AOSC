import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../services/authService"; 
import Input from "../../common/inputField/InputField";
import Button from "../../common/button/Button";
import Message from "../../common/message/Message";
import SpinnerOverlay from "../../common/spinner/Spinner"; // ✅ overlay spinner
import styles from "./ForgotPasswordForm.module.css";

const ForgotPassword = () => {
  const [correo, setCorreo] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ estado spinner
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true); // ✅ inicia overlay spinner

    try {
      const response = await authService.forgotPassword(correo);
      setSuccessMessage(response.message || "Se envió un correo con instrucciones.");
    } catch (err) {
      if (err.message && err.message.includes("No se pudo conectar")) {
        setError("No se pudo conectar con el servidor. Intenta nuevamente más tarde.");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("El correo ingresado no es válido o no existe.");
      }
    } finally {
      setLoading(false); // ✅ termina overlay
    }
  };

  // Limpia el error automáticamente después de 5 segundos
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className={styles.forgotPasswordContainer}>
      <div className={styles.forgotPasswordBox}>
        {loading && <SpinnerOverlay />} {/* ✅ overlay visible mientras loading=true */}

        <h2 className={styles.title}>¿Olvidaste tu contraseña?</h2>
        <p className={styles.description}>
          Ingresa el correo electrónico asociado a tu cuenta y te enviaremos
          instrucciones para restablecer tu contraseña.
        </p>

        {successMessage ? (
          <>
            <Message type="success" text={successMessage} />
            <Button type="button" onClick={() => navigate("/")}>
              Volver al login
            </Button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && <Message type="error" text={error} />}

            <Input
              type="email"
              placeholder="ejemplo@correo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />

            <Button type="submit" disabled={loading}>
              Enviar instrucciones
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;