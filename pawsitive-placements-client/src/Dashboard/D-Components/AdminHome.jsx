import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaUsers, FaPaw, FaStar, FaFileAlt, FaMoneyBillWave, FaHandHoldingHeart } from 'react-icons/fa';

const AdminHome = () => {

    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const {data : stats = {}} = useQuery({
        queryKey : ['admin-stats'],
        queryFn : async()=>{
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    })

    const statCards = [
        { title: 'Total Users', value: stats?.user || 0, icon: <FaUsers />, color: '#0B2E33', bgColor: '#B8E3E9' },
        { title: 'Total Pets', value: stats?.pets || 0, icon: <FaPaw />, color: '#0B2E33', bgColor: '#c7f9ff' },
        { title: 'Total Reviews', value: stats?.reviews || 0, icon: <FaStar />, color: '#0B2E33', bgColor: '#d6eef1' },
        { title: 'Applications', value: stats?.applications || 0, icon: <FaFileAlt />, color: '#0B2E33', bgColor: '#afd9e0' },
        { title: 'Payments', value: stats?.payments || 0, icon: <FaMoneyBillWave />, color: '#0B2E33', bgColor: '#c2e5eb' },
        { title: 'Donations', value: stats?.donation || 0, icon: <FaHandHoldingHeart />, color: '#0B2E33', bgColor: '#b8e3e9' },
    ];

    return (
        <div className="p-4">
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-[#0B2E33]">
                    Welcome, {user?.displayName || 'Admin'}!
                </h1>
                <p className="text-gray-600 mt-2">
                    Here's an overview of your Pawsitive Placements statistics
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {statCards.map((card, index) => (
                    <div
                        key={index}
                        className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                        style={{ backgroundColor: card.bgColor }}
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold" style={{ color: card.color }}>
                                    {card.title}
                                </h2>
                                <div
                                    className="text-2xl p-3 rounded-full"
                                    style={{ color: card.color }}
                                >
                                    {card.icon}
                                </div>
                            </div>
                            <div className="text-4xl font-bold" style={{ color: card.color }}>
                                {card.value}
                            </div>
                        </div>
                        <div
                            className="absolute bottom-0 left-0 right-0 h-1.5 rounded-b-lg"
                            style={{ backgroundColor: card.color, opacity: 0.3 }}
                        ></div>
                    </div>
                ))}
            </div>

            <div className="mt-12 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-[#0B2E33] mb-4">Admin Dashboard</h2>
                <p className="text-gray-600">
                    From here, you can manage all aspects of Pawsitive Placements. Use the sidebar to navigate to different sections.
                </p>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#f0f9fb] p-4 rounded-lg border-l-4 border-[#0B2E33]">
                        <h3 className="text-lg font-semibold text-[#0B2E33]">Quick Actions</h3>
                        <ul className="mt-2 space-y-2">
                            <li className="flex items-center text-gray-700">
                                <span className="mr-2">→</span> Review recent applications
                            </li>
                            <li className="flex items-center text-gray-700">
                                <span className="mr-2">→</span> Add new pets to the system
                            </li>
                            <li className="flex items-center text-gray-700">
                                <span className="mr-2">→</span> Check user reports and feedback
                            </li>
                        </ul>
                    </div>
                    
                    <div className="bg-[#f0f9fb] p-4 rounded-lg border-l-4 border-[#0B2E33]">
                        <h3 className="text-lg font-semibold text-[#0B2E33]">System Status</h3>
                        <div className="mt-2 space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">System Status:</span>
                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Online</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">Last Updated:</span>
                                <span className="text-gray-900">{new Date().toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;