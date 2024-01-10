import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Corrected import statement

const useAuth = () => {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    isSuperUser: false,
    userId: null,
    companyID: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const userData = await response.json();
      localStorage.setItem("token", userData.token);

      const decodedToken = jwtDecode(userData.token);
      setAuth({
        isLoggedIn: true,
        isSuperUser: decodedToken.isSuperUser,
        userId: decodedToken.userId,
        companyID: decodedToken.companyID,
      });
      return { success: true };
    } catch (error) {
      return { success: false, message: "Error during login" };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setAuth({
      isLoggedIn: false,
      isSuperUser: false,
      userId: null,
      companyID: null,
    });
  };

  // Check the stored token on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setAuth({
            isLoggedIn: true,
            isSuperUser: decoded.isSuperUser,
            userId: decoded.userId,
            companyID: decoded.companyID,
          });
        } else {
          logout(); // Token is expired
        }
      } catch (error) {
        logout();
      }
    }
    setIsLoading(false); // Ensure this is called in all scenarios
  }, []);

  return { auth, isLoading, login, logout };
};

export default useAuth;
