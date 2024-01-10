import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const ProtectedRoute = ({
  component: Component,
  permissionRequired,
  ...rest
}) => {
  const { hasPermission } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        hasPermission() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;