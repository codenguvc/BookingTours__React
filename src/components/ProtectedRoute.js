import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ element }) => {
    const { auth } = useContext(AuthContext);

    return auth ? element : <Navigate to="/system/login" />;
};

export default ProtectedRoute;