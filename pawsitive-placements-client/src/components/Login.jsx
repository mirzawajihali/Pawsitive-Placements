import React, { useContext, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import SocialLogin from './SocialLogin';
import { loadCaptchaEnginge, LoadCanvasTemplate,  validateCaptcha } from 'react-simple-captcha';
import { useForm } from 'react-hook-form';


const Login = () => {
 
 

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
 const [disabled, setDisabled] = useState(true);
  const { signInWithEmail, setUser} = useContext(AuthContext);
  const [captcha, setCaptcha] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || '/';


  const {register, handleSubmit, formState: {errors}, watch} = useForm();

  const onSubmit = (data) => {
    console.log(data);
    signInWithEmail(data.email, data.password)
    .then((result) => {
      const user = result.user;
      setUser(user);

     
       navigate(from);
    })
    .catch((error) => {
      console.log(error);
    })

  }

  

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);


  const handleValidateCaptcha = (e) => {
    e.preventDefault();
    const value = e.target.value;
    if(validateCaptcha(value) === true){
      setError('');
      setDisabled(false);
      setCaptcha(true);
    }else{
      setError('Captcha is not valid');
      setDisabled(true);
      setCaptcha(false);
    }
  }

  return (
  <section>
    <div className="max-w-7xl h-16 mx-auto bg-black"> </div>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center pb-12 sm:px-6 lg:px-8">
        
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-extrabold text-[#041E2B]">Sign in to your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{' '}
              <Link to="/register" className="font-medium text-[#041E2B] hover:text-[#353E43]">
                create a new account
              </Link>
            </p>
          </motion.div>
        </div>
  
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
          >
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded"
              >
                {error}
              </motion.div>)
               }

               {captcha && 
                (
                  <motion.div
                   initial={{ opacity: 0, height: 0 }}
                   animate={{ opacity: 1, height: 'auto' }}
                   className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded"
                 >
                  Successfully validated
                 </motion.div>
               )}
               
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    {...register('email')}
                    type="email"
                    autoComplete="email"
                    required
                    
                   
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#B9D9EB] focus:border-[#B9D9EB]"
                  />
                </div>
              </div>
  
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    {...register('password')}
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                   
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#B9D9EB] focus:border-[#B9D9EB]"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Captcha
                </label>
                <div className="mt-1">
                <LoadCanvasTemplate />
                <input
                    id="captcha"
                    {...register('captcha')}
                    name="captcha"
                    type="text"
                   onBlur={handleValidateCaptcha}
                    required
                   
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#B9D9EB] focus:border-[#B9D9EB]"
                  />
                  
                </div>
              </div>
  
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#041E2B] focus:ring-[#B9D9EB] border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
  
                <div className="text-sm">
                  <a href="#" className="font-medium text-[#041E2B] hover:text-[#353E43]">
                    Forgot your password?
                  </a>
                </div>
              </div>
  
              <div>
                <motion.button
                  type="submit"
                  disabled={disabled}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#041E2B] hover:bg-[#353E43] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B9D9EB] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </motion.button>
              </div>
            </form>
  
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
  
            <SocialLogin/>
            </div>

          </motion.div>
        </div>
      </div>
  </section>
  );
};

export default Login; 