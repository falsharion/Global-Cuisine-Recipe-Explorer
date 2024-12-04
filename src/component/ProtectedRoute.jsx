import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loadingpage from './loadingpage';


const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  // If authentication is still loading, show loading page
  if (loading) {
    return <Loadingpage /> 
  }

  // If no user is authenticated, redirect to auth page
  if (!currentUser) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If user is authenticated, render the children
  return children;
};

export default ProtectedRoute;