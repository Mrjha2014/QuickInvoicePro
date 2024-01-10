import React from 'react';
import { useAuth } from '../auth/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      {user && user.isSuperUser && (
        <p>Welcome, Superuser! You have full access to the system.</p>
      )}
      {/* Other dashboard content */}
    </div>
  );
};

export default Dashboard;
