import {React} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = () => {
    const { authState } = useAuth();
    const token = authState.token
    
    return token ? <Outlet /> : <Navigate to="/signin" />;
}

export default PrivateRoute;

// Outlet is a component provided by react-router-dom that acts as a placeholder for rendering child routes in nested routing scenarios