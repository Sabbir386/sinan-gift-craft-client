import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import { AuthContext } from '../Contexts/AuthProvider';

const AdminRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const [isAdmin,isAdminLoading] = useAdmin(user?.email);
    const location = useLocation();

    if(loading || isAdminLoading){
        return <h1>Loading ....</h1>
    }
    if(user && isAdmin){
        return children;
    }
    else{
        
    }
    return <Navigate to={'/login'} state={{from: location}}></Navigate>
};

export default AdminRoute;