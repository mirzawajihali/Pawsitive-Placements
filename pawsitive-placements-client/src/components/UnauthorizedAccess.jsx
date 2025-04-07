import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const UnauthorizedAccess = ({location}) => {
  const navigate = useNavigate();



  const handleLogin = () =>   navigate("/login" , {state : {from : location}});
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#353E43] to-[#1E2529] flex flex-col items-center justify-center p-6">
      {/* Animated background elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5 }}
        className="fixed inset-0 overflow-hidden pointer-events-none"
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              rotate: Math.random() * 360
            }}
            animate={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              rotate: 360,
              transition: {
                duration: 30 + Math.random() * 30,
                repeat: Infinity,
                repeatType: "loop"
              }
            }}
            className="absolute opacity-70"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(185,217,235,0.3) 0%, rgba(53,62,67,0) 70%)'
            }}
          />
        ))}
      </motion.div>

      {/* Main card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md bg-[#353E43] rounded-2xl shadow-2xl overflow-hidden border border-[#B9D9EB]/20"
      >
        {/* Decorative header */}
        <div className="h-3 bg-[#B9D9EB]"></div>
        
        <div className="p-8 text-center">
          {/* Animated icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="mx-auto mb-6 w-24 h-24 rounded-full bg-[#B9D9EB]/10 flex items-center justify-center border-2 border-[#B9D9EB]/30"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="48" 
              height="48" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#B9D9EB" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <line x1="19" y1="8" x2="19" y2="14"></line>
              <line x1="22" y1="11" x2="16" y2="11"></line>
            </svg>
          </motion.div>
          
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-[#B9D9EB] mb-2"
          >
            Access Restricted
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[#B9D9EB]/80 mb-8"
          >
            Please authenticate to access the pet adoption platform.
          </motion.p>
          
          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col space-y-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-6 bg-[#B9D9EB] text-[#353E43] font-semibold rounded-lg hover:bg-[#B9D9EB]/90 transition-colors"
              onClick={handleLogin}
            >
              Sign In
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-3 px-6 border-2 border-[#B9D9EB] text-[#B9D9EB] font-medium rounded-lg hover:bg-[#B9D9EB]/10 transition-colors"
              onClick={() => navigate('/')}
            >
              Return Home
            </motion.button>
          </motion.div>
          
          {/* Sign up link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-[#B9D9EB]/70"
          >
            Don't have an account?{' '}
            <motion.span 
              whileHover={{ color: '#B9D9EB' }}
              className="font-semibold cursor-pointer underline underline-offset-4"
              onClick={() => navigate('/signup')}
            >
              Register here
            </motion.span>
          </motion.div>
        </div>
        
        {/* Footer decoration */}
        <div className="h-2 bg-[#B9D9EB]/10"></div>
      </motion.div>
      
      {/* Floating particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              opacity: 0
            }}
            animate={{
              y: `+=${Math.random() * 100 - 50}`,
              x: `+=${Math.random() * 100 - 50}`,
              opacity: [0, 0.6, 0],
              transition: {
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: '#B9D9EB'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default UnauthorizedAccess;