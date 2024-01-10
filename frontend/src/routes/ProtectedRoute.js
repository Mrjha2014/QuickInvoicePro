import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../auth/AuthContextProvider";

const ProtectedRoute = ({ children, requireSuperUser = false }) => {
  const { auth } = useAuthContext();

  if (!auth.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (requireSuperUser && !auth.isSuperUser) {
    return <Navigate to="/not-authorized" />;
  }

  return children;
};

export default ProtectedRoute;
