import React, { createContext, useContext } from "react";
import useAuth from "./useAuth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { auth, login, logout } = useAuth();

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
