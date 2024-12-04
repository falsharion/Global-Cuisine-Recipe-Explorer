import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loadingpage from './loadingpage';


const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  // If authentication is still loading, show nothing or a loading spinner
  if (loading) {
    return <Loadingpage /> // Or a more sophisticated loading component
  }

  // If no user is authenticated, redirect to auth page
  if (!currentUser) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If user is authenticated, render the children
  return children;
};

export default ProtectedRoute;