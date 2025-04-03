import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const UnauthorizedAccess = () => {
  const navigate = useNavigate();
  
    

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div>
         <div className="max-w-7xl h-16 mx-auto bg-black"> </div>
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card w-full max-w-md bg-base-100 shadow-xl"
        >
          <div className="card-body text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 mx-auto bg-error/10 rounded-full flex items-center justify-center mb-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                   className="w-10 h-10 text-error" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 9v4"></path>
                <path d="M12 17h.01"></path>
                <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z"></path>
              </svg>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-bold"
            >
              Login Required
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="py-4">You need to login first to access the pet adoption features.</p>
              
              <div className="flex flex-col gap-4 mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary w-full"
                  onClick={handleLogin}
                >
                  Login Now
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn btn-outline btn-secondary w-full"
                  onClick={() => navigate('/')}
                >
                  Back to Home
                </motion.button>
              </div>
              
              <p className="text-sm mt-6 text-base-content/60">
                New to PawFriends? 
                <motion.span 
                  whileHover={{ color: "#570df8" }}
                  className="ml-1 font-medium cursor-pointer"
                  onClick={() => navigate('/signup')}
                >
                  Create an account
                </motion.span>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UnauthorizedAccess;