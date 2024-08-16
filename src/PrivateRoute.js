// src/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const user = true; // get loggenIn details from context
            
    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
