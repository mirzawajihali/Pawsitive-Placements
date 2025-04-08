import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

import axios from 'axios';
import AdoptionCard from './AdoptionCard';

const MyAdoption = () => {
    const {user} = useContext(AuthContext);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   

    useEffect(() => {
        if (user?.email) {
            setLoading(true);
            axios.get(`http://localhost:3000/application?email=${user.email}`)


                .then(res => {
                    setApplications(res.data);
                    console.log(res.data); // instead of console.log(applications)
                    setLoading(false);
                })
                .catch(err => {
                    setError(err.response?.data?.message || 'Failed to fetch applications');
                    setLoading(false);
                });
        }
    }, [user?.email]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='max-w-7xl mx-auto'>
            <div className="max-w-7xl h-16 mx-auto bg-black"></div>
            <h1 className="text-2xl font-bold mb-6">My Adoption Requests</h1>
            <div className="grid grid-cols-1 gap-6">
                {applications.map((application, index) => (
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