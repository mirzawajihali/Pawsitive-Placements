import React, { useContext } from 'react';
import useAdmin from '../hooks/useAdmin';
import { AuthContext } from '../Provider/AuthProvider';
import { useLocation } from 'react-router-dom';

const AdminRouter = ({children}) => {

    const [isAdmin, isAdminLoading] = useAdmin();
    const{user, loading} = useContext(AuthContext);

    const location = useLocation();
    if(loading || isAdminLoading){
        <span class="loading loading-bars loading-xl"></span>
    }
    if(user && isAdmin ){
        return children;
    }
    return (
       <UnauthorizedAccess location ={location}></UnauthorizedAccess>
    )
};

export default AdminRouter;