import { createContext, useContext } from "react";
import { useAuth as useAuthHook } from "../hooks/useAuth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Usamos el hook que maneja token + expiración
  const auth = useAuthHook();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para consumir el contexto
export const useAuth = () => useContext(AuthContext);