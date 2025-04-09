import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';


import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from './useAxiosSecure';


const useMyApplication = () => {


    const axiosSecure = useAxiosSecure();
    const { user} = useContext(AuthContext);
    const { refetch, data: application = [] } = useQuery({
        queryKey: ['application', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/application?email=${user.email}`);
            return res.data;
        }
    })

    
    return [application, refetch]
};

export default useMyApplication;