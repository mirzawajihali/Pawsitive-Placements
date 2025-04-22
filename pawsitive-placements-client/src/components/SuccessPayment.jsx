import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const SuccessPayment = () => {
    const { width, height } = useWindowSize();
    
    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    return (
       <section>
         <div className="max-w-7xl h-16 mx-auto bg-black"> </div>
         <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            
            <Confetti
                width={width}
                height={height}
                recycle={false}
                numberOfPieces={500}
                colors={['#B9D9EB', '#041E2B', '#353E43', '#ffffff']}
            />
            
            <motion.div 
                className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-auto my-8 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Success checkmark icon */}
                <div className="flex justify-center mb-6">
                    <div className="rounded-full bg-[#B9D9EB] p-3 w-20 h-20 flex items-center justify-center">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-12 w-12 text-[#041E2B]" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M5 13l4 4L19 7" 
                            />
                        </svg>
                    </div>
                </div>

                {/* Success text */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-[#041E2B] mb-3">Payment Successful!</h2>
                    <p className="text-[#353E43] mb-6">
                        Thank you for your donation. Your contribution will help us care for more animals in need.
                    </p>
                    <div className="border-t border-gray-200 pt-6">
                        <p className="text-sm text-gray-600 mb-2">
                            A confirmation email has been sent to your inbox.
                        </p>
                        <p className="text-sm text-gray-600">
                            Transaction ID: <span className="font-medium">{Math.random().toString(36).substring(2, 12).toUpperCase()}</span>
                        </p>
                    </div>
                </div>

                {/* Action buttons */}
                <div className="space-y-3">
                    <Link to="/">
                        <motion.button 
                            className="w-full py-3 bg-[#353E43] hover:bg-[#041E2B] text-white rounded-md transition-colors duration-300 flex justify-center items-center"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Return to Home
                        </motion.button>
                    </Link>
                    <Link to="/pets">
                        <motion.button 
                            className="w-full py-3 bg-[#B9D9EB] hover:bg-[#a8c7d8] text-[#041E2B] rounded-md transition-colors duration-300 flex justify-center items-center"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Explore More Pets
                        </motion.button>
                    </Link>
                </div>

                {/* Paw prints decoration */}
                <div className="absolute -left-12 -bottom-12 opacity-5">
                    <svg width="120" height="120" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#000" d="M12 2c2.21 0 4 1.79 4 4 0 .88-.29 1.7-.8 2.4.32.08.64.1.98.1 2.21 0 4 1.79 4 4 0 1.49-.82 2.77-2.03 3.47.03.17.03.35.03.53 0 2.21-1.79 4-4 4-.95 0-1.81-.35-2.5-.91-.69.56-1.55.91-2.5.91-2.21 0-4-1.79-4-4 0-.18 0-.36.03-.53C3.82 15.27 3 13.99 3 12.5c0-2.21 1.79-4 4-4 .34 0 .66-.02.98-.1-.51-.7-.8-1.52-.8-2.4 0-2.21 1.79-4 4-4" />
                    </svg>
                </div>
                
                <div className="absolute -right-12 -top-12 opacity-5 rotate-180">
                    <svg width="120" height="120" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#000" d="M12 2c2.21 0 4 1.79 4 4 0 .88-.29 1.7-.8 2.4.32.08.64.1.98.1 2.21 0 4 1.79 4 4 0 1.49-.82 2.77-2.03 3.47.03.17.03.35.03.53 0 2.21-1.79 4-4 4-.95 0-1.81-.35-2.5-.91-.69.56-1.55.91-2.5.91-2.21 0-4-1.79-4-4 0-.18 0-.36.03-.53C3.82 15.27 3 13.99 3 12.5c0-2.21 1.79-4 4-4 .34 0 .66-.02.98-.1-.51-.7-.8-1.52-.8-2.4 0-2.21 1.79-4 4-4" />
                    </svg>
                </div>
            </motion.div>
        </div>
       </section>
    );
};

export default SuccessPayment;