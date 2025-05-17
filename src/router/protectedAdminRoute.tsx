import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { ReactNode } from 'react';
import React from 'react';


interface ProtectedAdminRouteProps {
  children: ReactNode;
}

export default function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {  const token = localStorage.getItem('token');

  if (!token) return <Navigate to="/login" />;

  try {
    const decodedToken: any = jwtDecode(token);
    if (decodedToken.role === 'admin') {
      return <>{children}</>; // fragment autour de children
    } else {
      return <Navigate to="/unauthorized" />; 
    }
  } catch (err) {
    return <Navigate to="/login" />;
  }
}