import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ProtectedRoute from "./components/SuperAdminRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          {/* <SuperAdminRoute path="/superadmin" component={Dashboard} /> */}

          <ProtectedRoute
            path="/admin"
            component={Dashboard}
            permissionRequired="superuser"
          />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
