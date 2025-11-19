import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authService } from "../../../services/authService";
import Input from "../../common/inputField/InputField";
import Button from "../../common/button/Button";
import Message from "../../common/message/Message";
import SpinnerOverlay from "../../common/spinner/Spinner"; // ✅ overlay spinner
import styles from "./ResetPasswordForm.module.css";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ estado spinner
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (contrasena !== confirmarContrasena) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true); // ✅ inicia overlay spinner

    try {
      const response = await authService.resetPassword(token, contrasena);
      setSuccessMessage(response.message || "Contraseña actualizada correctamente.");
    } catch (err) {
      if (err.message && err.message.includes("No se pudo conectar")) {
        setError("No se pudo conectar con el servidor. Intenta nuevamente más tarde.");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Ocurrió un error al restablecer la contraseña.");
      }
    } finally {
      setLoading(false); // ✅ termina overlay
    }
  };

  // Limpiar el error después de 5 segundos
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className={styles.resetPasswordContainer}>
      <div className={styles.resetPasswordBox}>
        {loading && <SpinnerOverlay />} {/* ✅ overlay visible mientras loading=true */}

        <h2 className={styles.title}>Restablecer contraseña</h2>
        <p className={styles.description}>
          Ingresa tu nueva contraseña y confírmala.
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
              type="password"
              placeholder="Nueva contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmarContrasena}
              onChange={(e) => setConfirmarContrasena(e.target.value)}
              required
            />

            <Button type="submit" disabled={loading}>
              Actualizar contraseña
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;