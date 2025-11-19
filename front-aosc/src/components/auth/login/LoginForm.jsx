import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { authService } from "../../../services/authService";
import Input from "../../common/inputField/InputField";
import Button from "../../common/button/Button";
import Message from "../../common/message/Message"; 
import Checkbox from "../../common/checkbox/Checkbox";
import SpinnerOverlay from "../../common/spinner/Spinner"; // ✅ overlay spinner
import AoscLogo from "../../../assets/img/Aosc-negro.png";
import styles from "./LoginForm.module.css";

const LoginForm = () => { 
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [recordarme, setRecordarme] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ estado spinner
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // ✅ mostrar overlay

    try {
      const data = await authService.login(correo, clave);
      login(data.jwTtoken, recordarme); 
      navigate("/dashboard");
    } catch (err) {
      if (err.message && err.message.includes('No se pudo conectar')) {
        setError('No se pudo conectar con el servidor. Intenta nuevamente más tarde.');
      } else if (err.message && !err.message.startsWith('Error')) {
        setError(err.message); 
      } else {
        setError('El usuario o la contraseña no son correctos.');
      }
    } finally {
      setLoading(false); // ✅ ocultar overlay
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        {loading && <SpinnerOverlay />} {/* ✅ overlay visible mientras loading=true */}

        <div className={styles.logoSection}>
          <img src={AoscLogo} alt="logo" />
        </div>

        <h2>Bienvenido de nuevo</h2>

        {error && <Message type="error" text={error} />} 

        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Contraseña"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            required
          />

          <div className={styles.optionsColumn}>
            <Checkbox
              label="Recuérdame"
              checked={recordarme}
              onChange={(e) => setRecordarme(e.target.checked)}
            />
            <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
          </div>

          <Button type="submit" disabled={loading}>
            Iniciar sesión
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;