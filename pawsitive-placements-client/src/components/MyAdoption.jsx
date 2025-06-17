import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';


import AdoptionCard from './AdoptionCard';
import UserCard from './UserCard';
import useMyApplication from '../hooks/useMyApplication';

const MyAdoption = () => {
    const {user, loading} = useContext(AuthContext);
    
    

    const [application, refetch] = useMyApplication();
   

    // useEffect(() => {
    //     if (user?.email) {
    //         setLoading(true);
    //         axios.get(`http://localhost:3000/application?email=${user.email}`)


    //             .then(res => {
    //                 setApplications(res.data);
    //                 console.log(res.data); // instead of console.log(applications)
    //                 setLoading(false);
    //             })
    //             .catch(err => {
    //                 setError(err.response?.data?.message || 'Failed to fetch applications');
    //                 setLoading(false);
    //             });
    //     }
    // }, [user?.email]);

  
   

    if (loading) return <div className='min-h-full'>
         <div className="max-w-5xl h-16 mx-auto bg-black"></div>
         <div className='flex justify-center items-center'>
         <span className="loading loading-bars loading-xl"></span>
         </div>

        </div>;
    // if (error) return <div>Error: {error}</div>;


    if(application.length == 0){
        return (
            <div className='max-w-5xl mx-auto'>
            <div className="max-w-5xl h-16 mx-auto bg-black"></div>
            <UserCard className=" "></UserCard>
            <h1 className="text-2xl text-center font-bold mb-6">You dont have any application Requests yet</h1>
           
           
        </div>
        )
    }

    return (
        <div className='max-w-7xl mx-auto'>
            <div className="max-w-7xl h-16 mx-auto bg-black"></div>
            <UserCard className=" "></UserCard>
            <h1 className="text-2xl font-bold mb-6">My Adoption Requests</h1>
            <div className="grid lg:grid-cols-2  grid-cols-1 gap-6 m-4">
                {application.map((application, index) => (
                    <AdoptionCard 
                        key={index} 
                        application={application} 
                    />
                ))}
            </div>
           
        </div>
    );
};

export default MyAdoption;