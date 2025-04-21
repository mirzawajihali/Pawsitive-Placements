import React, { useContext, useState } from 'react';
import SectionTitle from './SectionTitle';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from './CheckOutForm';
import { FaCreditCard, FaMoneyCheckAlt } from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Donate = () => {
    const [paymentMethod, setPaymentMethod] = useState('stripe');

    const {user} = useContext(AuthContext);

    const handleSSLCommerzPayment = async (e) => {
        e.preventDefault();
      const  amount = e.target.amount.value;
      
        const payment = {
            email : user.email,
            amount : amount,
            status : "pending",
            date : new Date().toISOString(),


            
        }
        

        // Here you would typically redirect to SSLCommerz or handle the form submission
        alert(`SSLCommerz payment of $${amount} would be initiated here`);


        const response = await axios.post("http://localhost:3000/create-ssl-payment", payment);

        if(response.data?.url){
            window.location.replace(response.data.url); }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-[#f0f9fb]">
            <div className="max-w-7xl h-16 mx-auto bg-black"></div>
            <SectionTitle title="Donation" description="Your generosity helps animals in need"></SectionTitle>

            <div className="max-w-4xl mx-auto px-4 pb-16">
                {/* Payment Method Selection */}
                <div className="mb-8 flex flex-col sm:flex-row justify-center gap-4">
                    <button 
                        onClick={() => setPaymentMethod('stripe')}
                        className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg shadow-md transition-all ${
                            paymentMethod === 'stripe' 
                                ? 'bg-[#0B2E33] text-white' 
                                : 'bg-white text-[#0B2E33] hover:bg-gray-100'
                        }`}
                    >
                        <FaCreditCard />
                        <span>Stripe Payment</span>
                    </button>
                    
                    <button 
                        onClick={() => setPaymentMethod('sslcommerz')}
                        className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg shadow-md transition-all ${
                            paymentMethod === 'sslcommerz' 
                                ? 'bg-[#0B2E33] text-white' 
                                : 'bg-white text-[#0B2E33] hover:bg-gray-100'
                        }`}
                    >
                        <FaMoneyCheckAlt />
                        <span>SSLCommerz Payment</span>
                    </button>
                </div>

                {/* Payment Forms */}
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-[#0B2E33] mb-6 text-center">
                        {paymentMethod === 'stripe' ? 'Donate via Stripe' : 'Donate via SSLCommerz'}
                    </h3>

                    <div className="max-w-md mx-auto">
                        {paymentMethod === 'stripe' ? (
                            <div className="transition-all">
                                <p className="mb-4 text-gray-600 text-center">
                                    Secure card payment via Stripe. Your donation helps provide food, shelter, and medical care for animals in need.
                                </p>
                                <Elements stripe={stripePromise}>
                                    <CheckOutForm />
                                </Elements>
                            </div>
                        ) : (
                            <div className="transition-all">
                                <p className="mb-4 text-gray-600 text-center">
                                    SSLCommerz offers multiple payment options including mobile banking, internet banking, and more for Bangladesh.
                                </p>
                                <form onSubmit={handleSSLCommerzPayment} className="space-y-4">
                                    <div>
                                        <label htmlFor="ssl-amount" className="block text-sm font-medium text-[#0B2E33]">
                                            Donation Amount (BDT)
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="number"
                                                name="amount"
                                                id="ssl-amount"
                                                required
                                                className="w-full px-3 py-2 border border-[#93B1B5] rounded-md focus:outline-none focus:ring-1 focus:ring-[#4F7C82] focus:border-[#4F7C82] text-[#0B2E33]"
                                                placeholder="Enter amount"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="ssl-name" className="block text-sm font-medium text-[#0B2E33]">
                                            Full Name
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                name="name"
                                                id="ssl-name"
                                                required
                                                className="w-full px-3 py-2 border border-[#93B1B5] rounded-md focus:outline-none focus:ring-1 focus:ring-[#4F7C82] focus:border-[#4F7C82] text-[#0B2E33]"
                                                placeholder="Your name"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="ssl-email" className="block text-sm font-medium text-[#0B2E33]">
                                            Email Address
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="email"
                                                name="email"
                                                id="ssl-email"
                                                required
                                                className="w-full px-3 py-2 border border-[#93B1B5] rounded-md focus:outline-none focus:ring-1 focus:ring-[#4F7C82] focus:border-[#4F7C82] text-[#0B2E33]"
                                                placeholder="you@example.com"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="ssl-phone" className="block text-sm font-medium text-[#0B2E33]">
                                            Phone Number
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="tel"
                                                name="phone"
                                                id="ssl-phone"
                                                required
                                                className="w-full px-3 py-2 border border-[#93B1B5] rounded-md focus:outline-none focus:ring-1 focus:ring-[#4F7C82] focus:border-[#4F7C82] text-[#0B2E33]"
                                                placeholder="Your phone number"
                                            />
                                        </div>
                                    </div>
                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-[#0B2E33] hover:bg-[#0e373d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B2E33]"
                                        >
                                            Proceed to Payment
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>

                {/* Info Panel */}
                <div className="mt-8 bg-[#f0f9fb] rounded-xl p-6 border border-[#d6eef1]">
                    <h4 className="text-lg font-medium text-[#0B2E33] mb-3">Why Your Donation Matters</h4>
                    <p className="text-gray-700 mb-2">
                        Your generosity directly impacts the lives of animals in need. Every donation helps provide:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 pl-2">
                        <li>Food and shelter for rescued animals</li>
                        <li>Veterinary care and medications</li>
                        <li>Spay/neuter programs to reduce overpopulation</li>
                        <li>Rescue operations and transportation</li>
                        <li>Rehabilitation for abused or injured animals</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Donate;