import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { ROLES, ROLE_PERMISSIONS, Role } from '../../constants/roles';

interface RoleBasedRouteProps {
  children: React.ReactNode;
  allowedRoles: Role[];
  fallbackPath?: string;
  requireAll?: boolean; // If true, user must have ALL roles, if false, user needs ANY role
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({
  children,
  allowedRoles,
  fallbackPath = '/unauthorized',
  requireAll = false
}) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/signin" replace />;
  }

  const hasRequiredRole = requireAll
    ? allowedRoles.every(role => user.role === role)
    : allowedRoles.includes(user.role as Role);

  if (!hasRequiredRole) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
};

interface PermissionBasedRouteProps {
  children: React.ReactNode;
  permission: keyof typeof ROLE_PERMISSIONS[Role];
  fallbackPath?: string;
}

const PermissionBasedRoute: React.FC<PermissionBasedRouteProps> = ({
  children,
  permission,
  fallbackPath = '/unauthorized'
}) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/signin" replace />;
  }

  const userRole = user.role as Role;
  const hasPermission = ROLE_PERMISSIONS[userRole]?.[permission] || false;

  if (!hasPermission) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
};

export { RoleBasedRoute, PermissionBasedRoute };

