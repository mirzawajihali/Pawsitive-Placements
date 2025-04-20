import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    
    const { data: payments = [], isLoading, error } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/payments/${user?.email}`);
            return res.data;
        }
    });

    if (isLoading) return <div className="text-center py-10">Loading payment history...</div>;
    if (error) return <div className="text-center py-10 text-red-500">Error loading payments: {error.message}</div>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-[#0B2E33]">
                Payment History ({payments.length})
            </h1>
            
            {payments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    No payment records found.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-[#4F7C82] text-white">
                                <th className="border p-3 text-left">#</th>
                                <th className="border p-3 text-left">Date</th>
                                <th className="border p-3 text-left">Transaction ID</th>
                                <th className="border p-3 text-right">Amount</th>
                                <th className="border p-3 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => (
                                <tr key={payment._id} className="hover:bg-gray-50">
                                    <td className="border p-3">{index + 1}</td>
                                    <td className="border p-3">
                                        {new Date(payment.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </td>
                                    <td className="border p-3 font-mono text-sm">
                                        {payment.transactionId}
                                    </td>
                                    <td className="border p-3 text-right">
                                        ${payment.price.toFixed(2)}
                                    </td>
                                    <td className="border p-3">
                                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                            Completed
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PaymentHistory;