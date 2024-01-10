import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const SuperuserRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        user  ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default SuperuserRoute;
