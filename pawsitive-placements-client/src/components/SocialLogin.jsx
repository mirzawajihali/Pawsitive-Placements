
import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../Provider/AuthProvider';
import { FaGoogle } from 'react-icons/fa';

const SocialLogin = () => {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
  
    const {signInWithGoogle} = useContext(AuthContext);

    
  const handleGoogleLogin = () => {
    signInWithGoogle()
    .then((result) => {
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
        setError(error.message);
      
    })
  };
    return (
        <div className="mt-6">
                <motion.button
                  type="button"
                  onClick={handleGoogleLogin}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B9D9EB]"
                >
                  <FaGoogle className="w-5 h-5 mr-2 text-red-900" />
                  Sign in with Google
                </motion.button>
              </div>
    );
};

export default SocialLogin;