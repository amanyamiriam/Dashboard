import React, { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';

const PermissionContext = createContext(null);

export const PermissionProvider = ({ children }) => {
  const { user } = useAuth();

  const permissions = {
    canManageUsers: user?.role === 'admin',
    canManagePermissions: user?.role === 'admin',
    canViewRevenue: ['admin', 'manager'].includes(user?.role),
    canEditFlights: ['admin', 'manager'].includes(user?.role),
    canViewReports: ['admin', 'manager', 'analyst'].includes(user?.role),
    canSendNotifications: ['admin', 'manager'].includes(user?.role),
  };

  const checkPermission = (permission) => {
    return permissions[permission] || false;
  };

  return (
    <PermissionContext.Provider value={{ permissions, checkPermission }}>
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermissions = () => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error('usePermissions must be used within a PermissionProvider');
  }
  return context;
};