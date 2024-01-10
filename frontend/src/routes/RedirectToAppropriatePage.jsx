import React from "react";
import ProtectedRoute from "./ProtectedRoute";
import SuperUserPage from "../pages/Home";
import RegularUserPage from "../pages/Dashboard"; // Assume this is for regular users

const RedirectToAppropriatePage = () => {
  return (
    <>
      <ProtectedRoute requireSuperUser={true}>
        <SuperUserPage />
      </ProtectedRoute>
      <ProtectedRoute>
        <RegularUserPage />
      </ProtectedRoute>
    </>
  );
};

export default RedirectToAppropriatePage;
