import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext({
  user: null,
  hasPermission: (permission) => false, // Default implementation
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setUser(decoded);
        } else {
          // Token is expired
          localStorage.removeItem("token");
          setUser(null);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  }, []);

  const hasPermission = (permission) => {
    return user?.permissions?.includes(permission) || false;
  };

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, message: errorData.message || "Login failed" };
      }

      const userData = await response.json();
      localStorage.setItem("token", userData.token);

      const decodedToken = jwtDecode(userData.token);
      setUser({
        name: "John Doe",
        permissions: ["superuser", "editor"], // Setting permissions manually
      });
      const hasPermission = (permission) => {
        return user?.permissions?.includes(permission) || false;
      };
      return { success: true };
    } catch (error) {
      console.error("Error during login:", error);
      return { success: false, message: "An error occurred during login." };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, hasPermission, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
