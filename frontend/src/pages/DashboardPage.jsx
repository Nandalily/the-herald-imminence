import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();
  
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {user ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <p>Welcome, {user.name}!</p>
        </div>
      ) : (
        <p>Please log in to view your dashboard.</p>
      )}
    </div>
  );
};

export default DashboardPage;
