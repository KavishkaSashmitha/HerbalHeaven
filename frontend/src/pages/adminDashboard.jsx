// AdminDashboard.js
import React, { useEffect } from 'react';
import { useAuth } from '../middleware/authContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { isLoggedIn, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      // Redirect to login if the user is not logged in
      navigate('/login');
    } else if (!isAdmin) {
      // Redirect to home if the user is not an admin
      navigate('/');
    }
  }, [isLoggedIn, isAdmin, navigate]);

  if (isLoggedIn && isAdmin) {
    return (
      <div>
        <h1>Welcome to Admin Dashboard</h1>
        {/* Add admin-specific functionality here */}
      </div>
    );
  }

  // Render nothing if the user is not logged in or not an admin
  return null;
};

export default AdminDashboard;
