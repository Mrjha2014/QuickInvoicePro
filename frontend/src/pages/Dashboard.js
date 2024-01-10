import React from "react";
import { useAuthContext } from "../auth/AuthContextProvider"; // adjust the path as necessary

const Dashboard = () => {
  const { auth } = useAuthContext();

  return (
    <div>
      <h1>Dashboard</h1>
      {auth.isLoggedIn ? (
        <p>Welcome! User ID: {auth.userId}</p>
      ) : (
        <p>Please log in.</p>
      )}
      {/* Rest of your component */}
    </div>
  );
};
export default Dashboard;
