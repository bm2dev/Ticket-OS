import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
//
import { AuthContext } from '../context/Auth';

export default function PrivateRoutes() {

    const { user } = useContext(AuthContext);

    if(!user) return <Navigate to='/login' />;

    return <Outlet />;
}