import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuthContext } from "./auth/AuthContextProvider";
import ProtectedRoute from "./routes/ProtectedRoute";
import LoginComponent from "./components/Login";
import ProtectedPage from "./pages/Dashboard";
import SuperUserPage from "./pages/Home";

const RedirectToAppropriatePage = () => {
  const { auth } = useAuthContext();

  if (auth.isLoggedIn) {
    return auth.isSuperUser ? <Navigate to="/superuser-only" /> : <Navigate to="/protected" />;
  }
  return <LoginComponent />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<RedirectToAppropriatePage />} />
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <ProtectedPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/superuser-only"
            element={
              <ProtectedRoute requireSuperUser={true}>
                <SuperUserPage />
              </ProtectedRoute>
            }
          />
          {/* Other routes */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
