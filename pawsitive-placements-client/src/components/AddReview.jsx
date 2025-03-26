import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { FaStar, FaRegStar, FaUpload } from 'react-icons/fa';

const AddReview = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',})

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    }

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#041E2B] px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Share Your Adoption Experience</h2>
            <p className="text-[#B9D9EB] mt-1">Help others by sharing your story with Pawsitive Placements</p>
          </div>
          
          {/* Form */}
          <div className="p-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded"
              >
                {error}
              </motion.div>
            )}
            
            {success && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-6 p-3 bg-green-100 border border-green-400 text-green-700 rounded"
              >
                Thank you for your review! Your feedback helps other pet adopters make informed decisions.
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Your Name*
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#B9D9EB] focus:ring-[#B9D9EB]"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                      Your Role/Title*
                    </label>
                    <input
                      type="text"
                      name="role"
                      id="role"
                     
                      placeholder="e.g. Pet Parent, Dog Lover, etc."
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#B9D9EB] focus:ring-[#B9D9EB]"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="adoptedPet" className="block text-sm font-medium text-gray-700">
                      Name of Adopted Pet*
                    </label>
                    <input
                      type="text"
                      name="adoptedPet"
                      id="adoptedPet"
                   
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#B9D9EB] focus:ring-[#B9D9EB]"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Rating*
                    </label>
                 
                  </div>
                </div>
                
                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Photo
                    </label>
                    <div className="flex items-center justify-center">
                      <div className="w-32 h-32 border-2 border-gray-300 border-dashed rounded-full flex items-center justify-center overflow-hidden relative bg-gray-50">
                        
                        <input
                          type="file"
                          name="image"
                          id="image"
                          accept="image/*"
                       
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-center text-gray-500 mt-2">Click to upload your photo</p>
                  </div>
                  
                  <div>
                    <label htmlFor="reviewText" className="block text-sm font-medium text-gray-700">
                      Your Review*
                    </label>
                    <textarea
                      id="reviewText"
                      name="reviewText"
                      rows="7"
                     
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#B9D9EB] focus:ring-[#B9D9EB]"
                      placeholder="Share your experience about adopting from Pawsitive Placements..."
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#041E2B] hover:bg-[#353E43] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B9D9EB] transition-colors duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Submitting...' : 'Submit Your Review'}
                </motion.button>
                <p className="mt-2 text-xs text-gray-500 text-center">
                  By submitting, you agree to our terms and privacy policy.
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddReview; 