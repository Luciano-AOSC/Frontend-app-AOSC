import { useState, useEffect } from "react";

export function useAuth(expirationMinutes = 60) {
  const [token, setToken] = useState(null);

  const login = (tokenValue, remember = false) => {
    const expiresAt = Date.now() + expirationMinutes * 60 * 1000;
    setToken(tokenValue);

    if (remember) {
      // persiste aunque cierre el navegador
      localStorage.setItem("token", tokenValue);
      localStorage.setItem("token_exp", expiresAt);
    } else {
      // solo para la sesión actual
      sessionStorage.setItem("token", tokenValue);
      sessionStorage.setItem("token_exp", expiresAt);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("token_exp");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("token_exp");
  };

  useEffect(() => {
    // Prioridad a localStorage si existe
    const storedToken =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const exp =
      localStorage.getItem("token_exp") || sessionStorage.getItem("token_exp");

    if (storedToken && exp && Date.now() < exp) {
      setToken(storedToken);
    } else {
      logout();
    }
  }, []);

  return { token, login, logout };
}