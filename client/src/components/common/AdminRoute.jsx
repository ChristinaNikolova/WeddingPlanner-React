import { useContext } from 'react';
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from '../../contexts/authContext';

const AdminRoute = ({ children }) => {
    const { isAdmin } = useContext(AuthContext);

    if (!isAdmin) {
        return <Navigate to="/" replace />
    }

    return children ? children : <Outlet />
};

export default AdminRoute;