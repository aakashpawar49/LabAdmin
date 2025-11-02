import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../constants/roles';

const RoleBasedRedirect: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/signin" replace />;
  }

  // Redirect based on user role
  switch (user.role) {
    case ROLES.ADMIN:
    case ROLES.FACULTY:
      return <Navigate to="/" replace />;
    case ROLES.LAB_TECH:
      return <Navigate to="/lab-tech-dashboard" replace />;
    case ROLES.STUDENT:
      return <Navigate to="/student-dashboard" replace />;
    default:
      return <Navigate to="/unauthorized" replace />;
  }
};

export default RoleBasedRedirect;

