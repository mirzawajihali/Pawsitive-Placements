import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';

const Works = () => {
  // Data for the work cards
  const worksData = [
    {
      image: "https://images.unsplash.com/photo-1594004844563-536a03a6e532?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Successful Dog Rescue",
      info: "Rescued a lost Golden Retriever from the streets and reunited him with a loving family."
    },
    {
      image: "https://images.unsplash.com/photo-1711349171471-17af62170e05?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Adopt-a-Cat Drive",
      info: "Organized a cat adoption event where 20+ kittens found forever homes."
    },
    {
      image: "https://images.unsplash.com/photo-1661552066736-935e0cad1782?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Emergency Vet Aid",
      info: "Provided medical assistance and shelter to an injured stray dog during a rainy night."
    },
    {
      image: "https://images.unsplash.com/photo-1608408891486-f5cade977d19?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Pet Food Distribution",
      info: "Distributed food and care packages to street animals during the heatwave."
    },
    {
      image: "https://images.unsplash.com/photo-1627437753987-ee28cbaa52db?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Rescue from Flood Zone",
      info: "Evacuated pets from a flooded area and arranged temporary shelter and treatment."
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-[#F8FBFD]">
      <div className="container max-w-7xl mx-auto px-4">
        <SectionTitle 
          title="Our Impact Stories" 
          description="Real stories of how we've made a difference in the lives of animals in need." 
        />
        
        <motion.div
          className="mt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {worksData.map((work, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className={`flex flex-col md:flex-row items-stretch mb-0 bg-white ${
                index % 2 !== 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Image Section */}
              <div className="w-full md:w-1/2 relative overflow-hidden h-80 md:h-auto">
                <img 
                  src={work.image} 
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041E2B]/50 to-transparent opacity-60"></div>
                
                {/* Mobile Title (visible only on small screens) */}
                <div className="md:hidden absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold">{work.title}</h3>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-12 bg-white">
                {/* Desktop Title (hidden on small screens) */}
                <h3 className="hidden md:block text-2xl font-bold text-[#041E2B] mb-4">{work.title}</h3>
                
                <p className="text-[#353E43] text-lg leading-relaxed mb-6">{work.info}</p>
                
                <div className="mt-auto">
                  <div className="inline-block">
                    <div className="h-1 w-16 bg-[#B9D9EB] mb-4"></div>
                    <motion.button 
                      className="flex items-center text-[#041E2B] font-medium group"
                      whileHover={{ x: 5 }}
                    >
                      Read Full Story 
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* CTA Section */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-[#041E2B] mb-4">
            Join Us in Making a Difference
          </h3>
          <p className="text-[#353E43] mb-8 max-w-3xl mx-auto">
            Help us continue our mission of rescuing and rehoming animals in need. Every donation, volunteer hour, and adoption makes a world of difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a 
              href="/donate" 
              className="px-8 py-3 bg-[#041E2B] text-white rounded-md font-medium hover:bg-[#0a2c3d] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Donate Now
            </motion.a>
            <motion.a 
              href="/register" 
              className="px-8 py-3 bg-[#B9D9EB] text-[#041E2B] rounded-md font-medium hover:bg-[#a8c7d8] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Join Us
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Works;