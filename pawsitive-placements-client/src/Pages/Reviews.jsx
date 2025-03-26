import React from 'react';
import { useLoaderData } from 'react-router-dom';

import { motion } from 'framer-motion';
import { FaQuoteLeft, FaQuoteRight, FaStar } from 'react-icons/fa';
import Rating from 'react-rating';
import { ImStarEmpty } from 'react-icons/im';

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
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative pb-1"
          >
            {/* Quote Icons */}
            <div className="absolute">
              <FaQuoteLeft className="absolute top-2 left-2 text-[#B9D9EB] text-4xl opacity-20" />
              <FaQuoteRight className="absolute bottom-2 right-2 text-[#B9D9EB] text-4xl opacity-20" />
            </div>
          
            {/* Review Content */}
            <div className="p-6">
              {/* User Info with Pet Image */}
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <img
                    src={review.userImage}
                    alt={review.userName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#B9D9EB]"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-[#041E2B]">{review.userName}</h3>
                      <p className="text-sm text-[#353E43]">{review.location}</p>
                    </div>
                    <div className="text-xs text-gray-500">{review.date}</div>
                  </div>
                  
                  {/* Rating */}
                  <Rating
                  initialRating={review.rating}
                  readonly
                  emptySymbol={<ImStarEmpty  className="text-[#B9D9EB] text-xl" />}
                  fullSymbol={<FaStar className="text-[#B9D9EB] text-xl" />}
                  className="mb-4"
                />
                </div>
              </div>
          
              {/* Review Text */}
              <p className="text-[#353E43] mb-4 pl-2 border-l-4 border-[#B9D9EB]">
                {review.reviewText}
              </p>
          
              {/* Pet Info */}
              <div className="flex items-center gap-3 bg-[#F8FBFD] p-3 rounded-lg">
                <img 
                  src={review.petImage} 
                  alt={review.petAdopted} 
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-[#041E2B]">Adopted:</p>
                  <p className="text-[#353E43]">{review.petAdopted}</p>
                </div>
              </div>
            </div>
          
            {/* Bottom Gradient Border */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#041E2B] to-[#B9D9EB]"></div>
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
          <motion.button
            className="px-8 py-3 bg-[#041E2B] text-white rounded-lg font-semibold hover:bg-[#353E43] transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Submit Your Review
          </motion.button>
        </motion.div>
      </div>
    </section>
    );
};

export default Reviews;