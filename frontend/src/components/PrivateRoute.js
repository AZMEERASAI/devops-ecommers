import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({ children, roleRequired }) => {
  const { token, role } = useContext(AuthContext);

  if (!token) return <Navigate to="/login" />;
  if (roleRequired && role !== roleRequired) return <Navigate to={`/${role}`} />;

  return children;
};

export default PrivateRoute;
