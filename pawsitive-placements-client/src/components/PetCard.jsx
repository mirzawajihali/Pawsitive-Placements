import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';

const PetCard = ({ pet }) => {
  const [isHovered, setIsHovered] = useState(false);

  const {user} = useContext(AuthContext);
  const navigate = useNavigate();

  // Default pet data if none provided
  const defaultPet = {
    id: 1,
    name: 'Bella',
    age: '2 years',
    breed: 'Golden Retriever',
    gender: 'Female',
    description: 'Friendly and playful, loves long walks and is great with children.',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    status: 'Available',
  };

  // Use provided pet data or default
  const {
    _id,
    name, 
    age, 
    breed, 
    gender, 
    description, 
    image,
    status
  } = pet || defaultPet;


  const handleAdoption =() =>{
    if(user){
      navigate(`/pets/${_id}`)
    }

    else{
      Swal.fire({
        title: "You're not logged in!",
        text: "Please login to continue.",
        imageUrl: "https://cdn-icons-png.flaticon.com/512/565/565547.png", // Replace with your own image if needed
        imageWidth: 100,
        imageHeight: 100,
        imageAlt: "Login required",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Now",
        cancelButtonText: "Cancel"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login") // Navigate to login page
        }
      });
      
      
    }
  }

  return (
    <motion.div 
      className="relative bg-white rounded-lg m-4 overflow-hidden shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Status Badge */}
      <div className="absolute top-3 right-3 z-10">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          status === 'Available' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-[#B9D9EB] text-[#041E2B]'
        }`}>
          {status}
        </span>
      </div>

      {/* Image Container with staggered design */}
      <div className="relative">
        <div className="h-80 overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="h-full w-full object-cover object-center"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#041E2B] via-transparent to-transparent opacity-70"></div>
        </div>

        {/* Diagonal cutout for a unique look */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 100%)' }}></div>
        
        {/* Info badge positioned on the cutout */}
        <div className="absolute bottom-0 right-0 p-2">
          <div className="bg-[#353E43] text-white px-4 py-2 rounded-tl-lg rounded-br-lg shadow-md">
            <div className="text-xs flex items-center space-x-1">
              <span>{gender}</span>
              <span>•</span>
              <span>{age}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="px-5 pt-2 pb-5">
        {/* Pet name and breed */}
        <div className="mb-2">
          <h3 className="text-xl font-bold text-[#041E2B]">{name}</h3>
          <p className="text-sm text-[#353E43] opacity-80">{breed}</p>
        </div>

        {/* Description with subtle reveal on hover */}
        <motion.div 
          className="mb-4 overflow-hidden"
          animate={{ height: isHovered ? 'auto' : '40px' }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-[#353E43] text-sm">
            {description}
          </p>
        </motion.div>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-1 mb-4">
          <span className="inline-flex items-center px-2 py-1 bg-[#f8f9fa] text-[#353E43] rounded-md text-xs">
            <span className="mr-1 w-2 h-2 rounded-full bg-[#B9D9EB]"></span> House Trained
          </span>
          <span className="inline-flex items-center px-2 py-1 bg-[#f8f9fa] text-[#353E43] rounded-md text-xs">
            <span className="mr-1 w-2 h-2 rounded-full bg-[#B9D9EB]"></span> Vaccinated
          </span>
        </div>

        {/* Action buttons with a unique split design */}
        <div className="grid grid-cols-12 gap-2">
          <button onClick={handleAdoption}  className="col-span-8">
            <motion.button 
              className="w-full h-10 bg-[#353E43] hover:bg-[#041E2B] text-white rounded-md transition-colors duration-300 flex justify-center items-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Apply for adoption
            </motion.button>
          </button>
          
          {/* Split button design */}
          <div className="col-span-4 grid grid-cols-2 gap-2">
            <motion.button 
              className="w-full h-10 bg-[#B9D9EB] hover:bg-[#a8c7d8] text-[#041E2B] rounded-md transition-colors duration-300 flex justify-center items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </motion.button>
            
            <motion.button 
              className="w-full h-10 bg-[#f8f9fa] hover:bg-gray-200 text-[#353E43] rounded-md transition-colors duration-300 flex justify-center items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Subtle highlight border on hover */}
      <motion.div 
        className="absolute inset-0 border-2 border-transparent rounded-lg pointer-events-none"
        animate={{ 
          borderColor: isHovered ? '#B9D9EB' : 'transparent',
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default PetCard;