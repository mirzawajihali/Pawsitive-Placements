import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Helmet } from 'react-helmet';

const AboutSection = () => {
  // Refs for scroll-triggered animations
  const sectionRef = useRef(null);
  const missionRef = useRef(null);
  const statsRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);

  // Check if sections are in view
  const missionInView = useInView(missionRef, { once: false, amount: 0.3 });
  const statsInView = useInView(statsRef, { once: false, amount: 0.3 });
  const valuesInView = useInView(valuesRef, { once: false, amount: 0.3 });
  const teamInView = useInView(teamRef, { once: false, amount: 0.3 });

  // Parallax effect for background
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Transform values based on scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  // Mission section animation variants
  const missionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Stats animation variants with staggered children
  const statsContainerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const statsItemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  // Values section animation
  const valuesContainerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };
  
  const valuesItemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 12
      }
    }
  };

  // Team animation variants
  const teamVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2
      }
    }
  };

  const teamItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 50, 
        damping: 12 
      }
    }
  };

  return (
  <div>
     <Helmet>
                <meta charSet="utf-8" />
                <title>Pets</title>
                
            </Helmet>
            <div className="max-w-7xl h-16 mx-auto bg-black">
      

      </div> 

      <section id="about" className="relative overflow-hidden" ref={sectionRef}>
      {/* Parallax floating background elements */}
      <motion.div 
        className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-[#B9D9EB] opacity-10"
        style={{ y }}
      />
      <motion.div 
        className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-[#353E43] opacity-5"
        style={{ y: useTransform(scrollYProgress, [0, 1], [50, -150]) }}
      />
      
      {/* Main content with animated reveal */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
        style={{ opacity }}
      >
        {/* Section heading with reveal animation */}
        <motion.div 
          className="text-center mb-16 relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-block px-3 py-1 text-sm font-semibold bg-[#041E2B] text-white rounded-lg mb-2">
            About Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#041E2B] tracking-tight">
            Our Journey
          </h2>
          <div className="w-24 h-1 bg-[#B9D9EB] mx-auto mt-4"></div>
          
          <motion.div 
            className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full" 
            initial={{ opacity: 0.3 }}
            animate={{ 
              opacity: [0.2, 0.3, 0.2],
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut" 
            }}
            style={{
              background: "radial-gradient(circle, rgba(185,217,235,0.3) 0%, rgba(185,217,235,0) 70%)"
            }}
          />
        </motion.div>

        {/* Mission Section */}
        <motion.div 
          ref={missionRef}
          variants={missionVariants}
          initial="hidden"
          animate={missionInView ? "visible" : "hidden"}
          className="mb-20 max-w-3xl mx-auto text-center"
        >
          <h3 className="text-2xl font-bold text-[#353E43] mb-4">Our Mission</h3>
          <p className="text-lg text-[#353E43]">
            At Pawsitive Placements, we believe every pet deserves a loving home. Our mission is to connect 
            wonderful pets with caring families, creating lasting bonds and happy endings. We strive to ensure
            every adoption is a perfect match for both the pet and their new family.
          </p>
          
          {/* Animated accent line */}
          <motion.div 
            className="w-20 h-1 bg-[#B9D9EB] mx-auto mt-6"
            initial={{ width: 0 }}
            animate={missionInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          />
        </motion.div>

        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          variants={statsContainerVariants}
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
          className="mb-20"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div variants={statsItemVariants} className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-[#B9D9EB] text-center">
              <h4 className="text-4xl font-bold text-[#041E2B]">500+</h4>
              <p className="text-[#353E43] mt-2">Pets Adopted</p>
              <motion.div 
                className="w-full h-1 bg-[#B9D9EB] mt-4"
                initial={{ width: 0 }}
                animate={statsInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </motion.div>
            
            <motion.div variants={statsItemVariants} className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-[#B9D9EB] text-center">
              <h4 className="text-4xl font-bold text-[#041E2B]">100+</h4>
              <p className="text-[#353E43] mt-2">Volunteers</p>
              <motion.div 
                className="w-full h-1 bg-[#B9D9EB] mt-4"
                initial={{ width: 0 }}
                animate={statsInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </motion.div>
            
            <motion.div variants={statsItemVariants} className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-[#B9D9EB] text-center">
              <h4 className="text-4xl font-bold text-[#041E2B]">50+</h4>
              <p className="text-[#353E43] mt-2">Partner Shelters</p>
              <motion.div 
                className="w-full h-1 bg-[#B9D9EB] mt-4"
                initial={{ width: 0 }}
                animate={statsInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
              />
            </motion.div>
            
            <motion.div variants={statsItemVariants} className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-[#B9D9EB] text-center">
              <h4 className="text-4xl font-bold text-[#041E2B]">98%</h4>
              <p className="text-[#353E43] mt-2">Success Rate</p>
              <motion.div 
                className="w-full h-1 bg-[#B9D9EB] mt-4"
                initial={{ width: 0 }}
                animate={statsInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Core Values Section */}
        <div className="mb-20">
          <motion.h3 
            className="text-2xl font-bold text-[#353E43] mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={valuesInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Core Values
          </motion.h3>
          
          <motion.div
            ref={valuesRef}
            variants={valuesContainerVariants}
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div 
              variants={valuesItemVariants}
              className="bg-white p-8 rounded-lg shadow-lg relative overflow-hidden"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-[#353E43]" />
              <h4 className="text-xl font-bold text-[#041E2B] mb-3">Compassion</h4>
              <p className="text-[#353E43]">
                We treat every pet with love and respect, ensuring they receive the care they deserve throughout their journey.
              </p>
              <div className="absolute -bottom-10 -right-10 w-20 h-20 rounded-full bg-[#B9D9EB] opacity-10" />
            </motion.div>
            
            <motion.div 
              variants={valuesItemVariants}
              className="bg-white p-8 rounded-lg shadow-lg relative overflow-hidden"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-[#353E43]" />
              <h4 className="text-xl font-bold text-[#041E2B] mb-3">Trust</h4>
              <p className="text-[#353E43]">
                We build lasting relationships with our community through transparency and honesty in all of our adoption practices.
              </p>
              <div className="absolute -bottom-10 -right-10 w-20 h-20 rounded-full bg-[#B9D9EB] opacity-10" />
            </motion.div>
            
            <motion.div 
              variants={valuesItemVariants}
              className="bg-white p-8 rounded-lg shadow-lg relative overflow-hidden"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-[#353E43]" />
              <h4 className="text-xl font-bold text-[#041E2B] mb-3">Excellence</h4>
              <p className="text-[#353E43]">
                We strive for the highest standards in pet care and adoption services, continuously improving our processes.
              </p>
              <div className="absolute -bottom-10 -right-10 w-20 h-20 rounded-full bg-[#B9D9EB] opacity-10" />
            </motion.div>
          </motion.div>
        </div>

        {/* Team Section with perspective effect */}
        <motion.div
          ref={teamRef}
          className="relative py-6"
          initial={{ opacity: 0 }}
          animate={teamInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-[#353E43] mb-8 text-center">Our Team</h3>
          
          <motion.div
            variants={teamVariants}
            initial="hidden"
            animate={teamInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            <motion.div
              variants={teamItemVariants}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <div className="h-76 relative">
                <img
                  src="https://avatars.githubusercontent.com/u/159119082?v=4"
                  alt="Sarah Johnson"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041E2B] to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-xl font-bold">Suhail Ahmed Toha</h4>
                  <p className="text-sm">Adoption Coordinator</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-[#353E43]">
                Toha ensures our adoption process is smooth and matches pets with their perfect forever families.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={teamItemVariants}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <div className="h-76 relative">
                <img
                  src="https://avatars.githubusercontent.com/u/86684764?v=4"
                  alt="Michael Chen"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041E2B] to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-xl font-bold">Mirza Wajih Ali</h4>
                  <p className="text-sm">Founder & Director</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-[#353E43]">
                With over 15 years of experience in animal welfare, Wajih Bhai leads our team with passion and dedication.
               
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={teamItemVariants}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <div className="h-76 relative">
                <img
                  src="https://scontent.fdac24-5.fna.fbcdn.net/v/t1.15752-9/485223059_1115369216944790_2768389872980555564_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeFLbpzNG6lA-PZLah35PqOQS4jJq-goX1pLiMmr6ChfWm3MvVv8AfMo41j9SMAe87L5UujCYr6mMKByDqA7uSDP&_nc_ohc=d8MQZD7xz90Q7kNvgEYiik7&_nc_oc=Adm1XZynY_nuQvDKGk540coSuaZg_TDZ1Pv3lUkycF8rFaIQLDh-xsyzc-mGOSfWVyU&_nc_zt=23&_nc_ht=scontent.fdac24-5.fna&oh=03_Q7cD1wE_pbyPy21wu-Zrj_WJ_1Np-Exwm9MCm-Ohf6_3vvPDYw&oe=680BD31B"
                  alt="Emily Rodriguez"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041E2B] to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-xl font-bold">Mezbah Mohammad Saklain</h4>
                  <p className="text-sm">Veterinary Care Specialist</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-[#353E43]">
                  Saklain ensures all our animals receive top-notch medical care and are healthy for adoption.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Final CTA with parallax effect */}
        <motion.div 
          className="mt-16 bg-[#041E2B] rounded-xl p-10 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div 
            className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#B9D9EB] opacity-10"
            animate={{ 
              y: [0, 15, 0],
              x: [0, 10, 0]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut"
            }}
          />
          
          <motion.div 
            className="absolute -bottom-24 -left-16 w-56 h-56 rounded-full bg-[#B9D9EB] opacity-10"
            animate={{ 
              y: [0, -20, 0],
              x: [0, -10, 0]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 7,
              ease: "easeInOut"
            }}
          />
          
          <div className="relative z-10 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to make a difference?</h3>
            <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
              Join us in our mission to find loving homes for pets in need. Whether you want to adopt, 
              volunteer, or donate, every contribution helps create more happy tails.
            </p>
            <motion.button 
              className="px-8 py-3 bg-[#B9D9EB] text-[#041E2B] rounded-lg font-bold hover:bg-white transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Involved
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  </div>
  );
};

export default AboutSection; 