import React from 'react';
import { useLoaderData } from 'react-router-dom';


import { motion } from 'framer-motion';
import { FaPaw, FaQuoteLeft, FaQuoteRight, FaStar } from 'react-icons/fa';
import { ImStarEmpty } from 'react-icons/im';
import AddReview from '../components/AddReview';
import Rating from 'react-rating';

const Reviews = () => {
    const reviews = useLoaderData();
    
    return (
        <section className="pb-10 bg-gray-50">
             <div className="max-w-7xl h-16 mx-auto bg-black">
      

      </div> 
      <div className="max-w-7xl mt-6 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-3 py-1 text-sm font-semibold bg-[#041E2B] text-white rounded-lg mb-2">
            Testimonials
          </span>
          <h2 className="text-4xl font-bold text-[#041E2B] mb-4">
            Happy Tails & Success Stories
          </h2>
          <div className="w-24 h-1 bg-[#B9D9EB] mx-auto"></div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
        
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 relative"
            >
              {/* Top Border Accent */}
              <div className="h-2 bg-gradient-to-r from-[#041E2B] to-[#B9D9EB]"></div>
              
              {/* Quote Icons */}
              <div className="absolute">
                <FaQuoteLeft className="absolute top-6 left-6 text-[#B9D9EB] text-4xl opacity-20" />
                <FaQuoteRight className="absolute bottom-6 right-6 text-[#B9D9EB] text-4xl opacity-20" />
              </div>
              
              {/* Review Content */}
              <div className="p-8">
                {/* Rating */}
                <div className="mb-4">
                  <Rating
                    initialRating={review.rating}
                    readonly
                    emptySymbol={<ImStarEmpty className="text-[#B9D9EB] text-xl" />}
                    fullSymbol={<FaStar className="text-[#B9D9EB] text-xl" />}
                  />
                </div>
                
                {/* Review Text */}
                <p className="text-[#353E43] mb-6 relative z-10 font-medium">
                  "{review.reviewText}"
                </p>
                
                {/* User Info with Pet Image */}
                <div className="flex items-center mt-8">
                  <div className="mr-4 relative">
                    <img
                      src={review.userImage}
                      alt={review.userName}
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#B9D9EB] ring-2 ring-white ring-offset-1"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-[#041E2B] rounded-full p-1">
                      <FaPaw className="text-white text-xs" />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-[#041E2B]">{review.userName}</h3>
                    <p className="text-sm text-[#353E43]">{review.role}</p>
                  </div>
                  
                  <div className="ml-auto text-xs text-gray-500 flex flex-col items-end">
                    <span>{review.date}</span>
                    <div className="mt-1 flex items-center">
                      <span className="mr-1">Adopted:</span>
                      <img 
                        src={review.petImage} 
                        alt={review.petAdopted} 
                        className="w-8 h-8 rounded-full object-cover border border-[#B9D9EB]"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Pet Info Tag */}
                <motion.div 
                  className="mt-6 bg-[#F8FBFD] p-3 rounded-lg border-l-4 border-[#B9D9EB] flex items-center"
                  whileHover={{ x: 5 }}
                >
                  <img 
                    src={review.petImage} 
                    alt={review.petAdopted} 
                    className="w-12 h-12 rounded-lg object-cover mr-3"
                  />
                  <div>
                    <p className="text-sm font-medium text-[#041E2B]">Adopted Family Member:</p>
                    <p className="text-[#353E43] font-semibold">{review.petAdopted}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div> 
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-[#041E2B] mb-4">
            Share Your Story
          </h3>
          <p className="text-[#353E43] mb-6 max-w-2xl mx-auto">
            Have you adopted a pet from Pawsitive Placements? We'd love to hear your story and share it with our community.
          </p>
     
        </motion.div>
      </div>
          <AddReview></AddReview>
    </section>
    );
};

export default Reviews;