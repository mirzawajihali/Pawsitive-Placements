import React from 'react';
import cover from '../assets/images/petcover.jpg'
import { Link } from 'react-router-dom';

const PetCover = () => {
    return (
        <div className="relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-[#041E2B] opacity-90"></div>
      
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          className=" w-full h-full object-cover opacity-50"
          src={cover}
        />
      </div>
      
      <div className="max-w-7xl mx-auto">
  <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
    <main className="pt-24 mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
      <div className="sm:text-center lg:text-left">
        <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
          <span className="block">Find Your Perfect</span>
          <span className="block text-[#B9D9EB]">Furry Friend</span>
        </h1>
        <p className="mt-3 text-base text-gray-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
          From playful pups to cuddly cats, we have pets of all breeds and personalities ready to join your family. Every adoption saves a life.
        </p>
        
        <div className="mt-8 sm:mt-12 sm:flex sm:justify-center lg:justify-start gap-4">
          <div className="rounded-md shadow">
            <Link
              to="/pets"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#353E43] hover:bg-[#2d353a] transition-colors duration-300 md:py-4 md:text-lg md:px-10"
            >
              Browse Pets
            </Link>
          </div>
          <div className="mt-3 sm:mt-0">
            <Link
              to="/adoption-process"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-[#041E2B] bg-[#B9D9EB] hover:bg-[#a8c7d8] transition-colors duration-300 md:py-4 md:text-lg md:px-10"
            >
              How to Adopt
            </Link>
          </div>
        </div>
      </div>
     
    </main>
  </div>
  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
</div>
        </div>
    );
};

export default PetCover;