import React from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaPaw, FaHome, FaUser, FaDollarSign, FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useMyApplication from '../hooks/useMyApplication';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';


const AdoptionCard = ({ application }) => {
    const {
        _id, fullName, email, phone, image, petName, breed, category, adoptionFee, location,
        address, occupation, adoptionReason, petExperience, livingSituation
    } = application;

    const [, refetch] = useMyApplication();
    const axiosSecure = useAxiosSecure();


    const handleDelete =()=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/application/${_id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
        className="w-full bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-[#93B1B5] flex flex-col md:flex-row"
      >
        {/* Pet Image Section */}
        <div className="md:w-2/5 relative overflow-hidden h-48 md:h-auto">
          <motion.img
            src={image}
            alt={petName}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/30 to-transparent p-3 flex justify-between items-start">
            <span className="bg-[#0B2E33] text-[#B8E3E9] text-xs font-semibold px-2 py-1 rounded-full">
              {category}
            </span>
          
          </div>
        </div>
  
        {/* Content Section */}
        <div className="md:w-3/5 p-4 flex flex-col">
          {/* Pet Header */}
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-2xl font-bold text-[#0B2E33]">{petName}</h2>
              <p className="text-[#4F7C82]">{breed}</p>
            </div>
            <span className="bg-[#B8E3E9] text-[#0B2E33] font-semibold px-3 py-1 rounded-full flex items-center">
              <FaDollarSign className="mr-1" /> {adoptionFee}
            </span>
          </div>
  
          {/* Pet Details */}
          {/* <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center text-sm text-[#4F7C82]">
              <FaPaw className="mr-2 text-[#0B2E33]" />
              <span>Age: {age}</span>
            </div>
            <div className="flex items-center text-sm text-[#4F7C82]">
              <FaPaw className="mr-2 text-[#0B2E33]" />
              <span>Gender: {gender}</span>
            </div>
            <div className="flex items-center text-sm text-[#4F7C82]">
              <FaPaw className="mr-2 text-[#0B2E33]" />
              <span>Health: {healthStatus}</span>
            </div>
            <div className="flex items-center text-sm text-[#4F7C82]">
              <FaPaw className="mr-2 text-[#0B2E33]" />
              <span>Temperament: {temperament}</span>
            </div>
            {specialNeeds && (
              <div className="col-span-2 flex items-start text-sm text-[#4F7C82]">
                <FaInfoCircle className="mr-2 text-[#0B2E33] mt-0.5" />
                <span>Special Needs: {specialNeeds}</span>
              </div>
            )}
          </div> */}
  
          {/* Location */}
          <div className="flex items-center text-sm text-[#4F7C82] mb-3">
            <FaMapMarkerAlt className="mr-2 text-[#0B2E33]" />
            <span>{location}</span>
          </div>
  
          {/* Divider */}
          <div className="border-t border-[#93B1B5] my-2"></div>
  
          {/* Applicant Info (condensed) */}
          <div className="mb-2">
            <h3 className="text-sm font-semibold text-[#0B2E33] flex items-center mb-1">
              <FaUser className="mr-2" />
              Applicant: {fullName}
            </h3>
            <div className="grid grid-cols-2 gap-1 text-xs text-gray-600 pl-6">
              <p>Phone: {phone}</p>
              <p>Experience: {petExperience}</p>
            </div>
          </div>
  
          {/* View Details Button */}
        <div className='flex mt-auto gap-4 '>
        <Link to={`/pets/${_id}`}    className="bg-[#0B2E33] hover:bg-[#4F7C82] text-white font-medium py-2 px-4 rounded-lg transition-colors text-center duration-300 flex-1 text-sm"
    >  <motion.button
    
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    className='flex'
    >
      <FaInfoCircle className="mr-2" />
      View Details
    </motion.button></Link>

    <motion.button
      onClick={handleDelete}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
  
    
              className="text-red-600 hover:text-red-800 transition-colors p-1"
              aria-label="Delete"
            >
              <FaTrash className="text-lg" />
            
    </motion.button>
        </div>
        </div>
        
      </motion.div>
    );
};

export default AdoptionCard;