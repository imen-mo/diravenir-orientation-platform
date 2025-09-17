import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  // Vérifier si l'utilisateur est connecté
  const token = localStorage.getItem('token');
  const userData = localStorage.getItem('user');
  
  if (!token || !userData) {
    return <Navigate to="/login" replace />;
  }
  
  try {
    const user = JSON.parse(userData);
    
    // Vérifier si l'utilisateur est admin
    if (user.role !== 'ADMIN' && user.role !== 'admin') {
      return <Navigate to="/" replace />;
    }
    
    return children;
  } catch (error) {
    console.error('Erreur lors du parsing des données utilisateur:', error);
    return <Navigate to="/login" replace />;
  }
};

export default AdminRoute;
