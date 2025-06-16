import React, { useContext } from 'react';
import useAdmin from '../hooks/useAdmin';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const AdminRouter = ({children}) => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const{user, loading} = useContext(AuthContext);
    const location = useLocation();
    
    if(loading || isAdminLoading){
        return <LoadingSpinner />;
    }
    
    if(user && isAdmin){
        return children;
    }
    
    return (
      <Navigate to="/" state={{from : location}} replace></Navigate>
    );
};

export default AdminRouter;