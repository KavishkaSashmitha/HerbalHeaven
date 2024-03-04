// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../middleware/authContext';

const PrivateRoute = ({ element }) => {
  const { isLoggedIn, isAdmin } = useAuth();

  if (!isLoggedIn || !isAdmin) {
    // If not logged in or not an admin, redirect to the home page
    return <Navigate to="/" replace />;
  }

  // If logged in and is an admin, render the protected route
  return <Route element={element} />;
};

export default PrivateRoute;
