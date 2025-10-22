import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { loginUser } from "../../../services/authService";
import Input from "../../common/inputField/InputField";
import Button from "../../common/button/Button";
import Message from "../../common/message/Message"; 
import Checkbox from "../../common/checkbox/Checkbox";
import AoscLogo from "../../../assets/img/Aosc-negro.png";
import styles from "./LoginForm.module.css";

const LoginForm = () => { 
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [recordarme, setRecordarme] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await loginUser(correo, clave);
      login(data.jwTtoken, recordarme); 
      navigate("/dashboard");
    } catch (error) {
      if (error.message && error.message.includes('No se pudo conectar')) {
        setError('No se pudo conectar con el servidor. Intenta nuevamente más tarde.');
      } else if (error.message && !error.message.startsWith('Error')) {
        setError(error.message); 
      } else {
        setError('El usuario o la contraseña no son correctos.');
      }
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
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
          <Button type="submit">Iniciar sesión</Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;