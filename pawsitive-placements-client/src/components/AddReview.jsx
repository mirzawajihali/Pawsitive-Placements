import React, { useState, useRef, useContext } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaRegStar } from 'react-icons/fa';
import axios from 'axios';
import { AuthContext } from '../Provider/AuthProvider';

const AddReview = () => {

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const {user} = useContext(AuthContext)

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file (JPEG, PNG)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Image size must be less than 5MB');
        return;
      }
      setPreview(URL.createObjectURL(file));
      setError(''); // Clear any previous errors
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const formData = new FormData();
      const formElements = e.target.elements;
      
      // Append form data
      formData.append('name', formElements.name.value);
      formData.append('role', formElements.role.value);
      formData.append('adoptedPet', formElements.adoptedPet.value);
      formData.append('rating', rating.toString());
      formData.append('reviewText', formElements.reviewText.value);
      formData.append('userImage', user?.photoURL || '');
      
      if (fileInputRef.current.files[0]) {
        formData.append('image', fileInputRef.current.files[0]);
      }

      const response = await axios.post(
        'http://localhost:3000/reviews', // Add full backend URL
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        setSuccess(true);
        e.target.reset();
        setRating(0);
        setPreview(null);
      } else {
        setError(response.data.message || 'Failed to submit review');
      }
    } catch (err) {
      setError(err.response?.data?.message || 
               err.message || 
               'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
                <p>Thank you for your review!</p>
                <p className="mt-1 text-sm">Your feedback helps other pet adopters make informed decisions.</p>
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
                      value={user?.displayName || ''}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#B9D9EB] focus:ring-[#B9D9EB]"
                      required
                      minLength="2"
                      maxLength="50"
                      readOnly
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
                      minLength="2"
                      maxLength="50"
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
                      minLength="2"
                      maxLength="50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Rating*
                    </label>
                    <div className="flex justify-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          className="text-2xl focus:outline-none"
                          aria-label={`Rate ${star} star`}
                        >
                          {star <= rating ? (
                            <FaStar className="text-yellow-400" />
                          ) : (
                            <FaRegStar className="text-gray-300" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Pet's Photo
                    </label>
                    <div className="flex items-center justify-center">
                      <div className="w-32 h-32 border-2 border-gray-300 border-dashed rounded-full flex items-center justify-center overflow-hidden relative bg-gray-50">
                        <input
                          type="file"
                          name="image"
                          id="image"
                          accept="image/jpeg, image/png"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          aria-label="Upload pet photo"
                        />
                        {preview ? (
                          <img 
                            src={preview} 
                            alt="Pet preview" 
                            className="w-full h-full object-cover absolute inset-0"
                          />
                        ) : (
                          <div className="text-center p-4">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            <span className="mt-2 block text-sm text-gray-600">
                              Click to upload
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-center text-gray-500 mt-2">
                      JPEG or PNG (Max 5MB)
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="reviewText" className="block text-sm font-medium text-gray-700">
                      Your Review*
                    </label>
                    <textarea
                      id="reviewText"
                      name="reviewText"
                      rows="7"
                      className="mt-1 p-4 block w-full rounded-xl border-gray-300 shadow-sm focus:border-[#B9D9EB] focus:ring-[#B9D9EB]"
                      placeholder="Share your experience about adopting from Pawsitive Placements..."
                      required
                      minLength="20"
                      maxLength="1000"
                    />
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <motion.button
                  type="submit"
                  disabled={loading || rating === 0}
                  whileHover={{ scale: rating !== 0 ? 1.02 : 1 }}
                  whileTap={{ scale: rating !== 0 ? 0.98 : 1 }}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#041E2B] hover:bg-[#353E43] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B9D9EB] transition-colors duration-300 ${
                    loading || rating === 0 ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit Your Review'
                  )}
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