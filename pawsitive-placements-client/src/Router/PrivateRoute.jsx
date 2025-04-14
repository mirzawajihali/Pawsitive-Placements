import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import UnauthorizedAccess from '../components/UnauthorizedAccess';

const PrivateRoute = ({children}) => {

    const location = useLocation()

    const {user, loading} = useContext(AuthContext);
   

    if(loading){
        <span class="loading loading-bars loading-xl"></span>
    }
    if(user){
        return children;
    }
    return (
       <UnauthorizedAccess location ={location}></UnauthorizedAccess>
    )
};

export default PrivateRoute;