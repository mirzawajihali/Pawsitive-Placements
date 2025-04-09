import React from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaUser, FaHome, FaEye, FaMapMarkerAlt } from 'react-icons/fa';

const AdoptionCard = ({ application }) => {
    const {
        fullName, email, phone, image, petName, breed, category, adoptionFee, location,
        address, occupation, adoptionReason, petExperience, livingSituation
    } = application;

    const handleDelete =()=>{
console.log("hello")
    }

    return (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-4xl bg-[#93B1B5] rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-[#4F7C82] flex"
      >
        {/* Image Section */}
        <div className="w-1/3 relative overflow-hidden min-h-[200px]">
          <motion.img 
            src={image} 
            alt={petName} 
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0B2E33] to-transparent p-3">
            <h2 className="text-xl font-bold text-[#B8E3E9]">{petName}</h2>
            <p className="text-[#B8E3E9]/80 text-sm">{breed}</p>
          </div>
          <span className="absolute top-3 right-3 bg-[#4F7C82] text-[#B8E3E9] text-xs font-semibold px-2 py-1 rounded-full">
            {category}
          </span>
        </div>
  
        {/* Details Section */}
        <div className="w-2/3 p-4 flex flex-col relative">
          {/* Delete Button */}
          <button 
            onClick={handleDelete}
            className="absolute top-3 right-3 text-[#0B2E33] hover:text-[#4F7C82] transition-colors"
            aria-label="Delete"
          >
            <FaTrash />
          </button>
  
          {/* Top Row */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center text-[#0B2E33]">
              <FaMapMarkerAlt className="mr-1" />
              <span className="text-sm">{location}</span>
            </div>
            <span className="bg-[#B8E3E9] text-[#0B2E33] text-sm font-semibold px-2.5 py-0.5 rounded">
              ৳{adoptionFee}
            </span>
          </div>
  
          {/* Middle Section */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <h3 className="text-md font-semibold text-[#0B2E33] mb-1 flex items-center">
                <FaUser className="mr-2" />
                Applicant
              </h3>
              <div className="space-y-1 text-sm pl-6 text-[#0B2E33]">
                <p><span className="font-medium">Name:</span> {fullName}</p>
                <p><span className="font-medium">Phone:</span> {phone}</p>
                <p><span className="font-medium">Email:</span> {email}</p>
              </div>
            </div>
  
            <div>
              <h3 className="text-md font-semibold text-[#0B2E33] mb-1 flex items-center">
                <FaHome className="mr-2" />
                Details
              </h3>
              <div className="space-y-1 text-sm pl-6 text-[#0B2E33]">
                <p><span className="font-medium">Occupation:</span> {occupation}</p>
                <p><span className="font-medium">Address:</span> {address}</p>
                <p><span className="font-medium">Living:</span> {livingSituation.replace(/_/g, ' ')}</p>
              </div>
            </div>
          </div>
  
          {/* Bottom Section */}
          <div className="mt-auto">
            <div className="mb-3">
              <h3 className="text-md font-semibold text-[#0B2E33] mb-1">
                Adoption Reason
              </h3>
              <p className="text-sm text-[#0B2E33] line-clamp-2">
                {adoptionReason}
              </p>
            </div>
  
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#4F7C82] hover:bg-[#0B2E33] text-[#B8E3E9] font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center text-sm"
            >
              <FaEye className="mr-2" />
              View Full Details
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
};

export default AdoptionCard;