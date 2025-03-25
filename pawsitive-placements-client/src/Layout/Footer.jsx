import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaHeart, FaPaw } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#041E2B] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Link to="/" className="flex items-center mb-4">
                <FaPaw className="text-[#B9D9EB] text-3xl mr-2" />
                <span className="text-xl font-bold text-white">Pawsitive Placements</span>
              </Link>
              <p className="text-gray-300 mb-4">
                Finding forever homes for pets in need. Every adoption creates a new beginning for both pets and their families.
              </p>
              <div className="flex space-x-4">
                <motion.a 
                  href="#" 
                  whileHover={{ y: -3, color: '#B9D9EB' }}
                  className="text-gray-300 hover:text-[#B9D9EB] transition-colors"
                >
                  <FaFacebook size={20} />
                </motion.a>
                <motion.a 
                  href="#" 
                  whileHover={{ y: -3, color: '#B9D9EB' }}
                  className="text-gray-300 hover:text-[#B9D9EB] transition-colors"
                >
                  <FaTwitter size={20} />
                </motion.a>
                <motion.a 
                  href="#" 
                  whileHover={{ y: -3, color: '#B9D9EB' }}
                  className="text-gray-300 hover:text-[#B9D9EB] transition-colors"
                >
                  <FaInstagram size={20} />
                </motion.a>
                <motion.a 
                  href="#" 
                  whileHover={{ y: -3, color: '#B9D9EB' }}
                  className="text-gray-300 hover:text-[#B9D9EB] transition-colors"
                >
                  <FaYoutube size={20} />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6 text-white relative inline-block">
                Quick Links
                <div className="absolute bottom-0 left-0 h-1 w-full bg-[#B9D9EB]"></div>
              </h3>
              <ul className="space-y-3">
                <li>
                  <motion.div whileHover={{ x: 5 }}>
                    <Link to="/" className="text-gray-300 hover:text-[#B9D9EB] transition-colors flex items-center">
                      <span className="mr-2">›</span> Home
                    </Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileHover={{ x: 5 }}>
                    <Link to="/pets" className="text-gray-300 hover:text-[#B9D9EB] transition-colors flex items-center">
                      <span className="mr-2">›</span> Available Pets
                    </Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileHover={{ x: 5 }}>
                    <a href="#about" className="text-gray-300 hover:text-[#B9D9EB] transition-colors flex items-center">
                      <span className="mr-2">›</span> About Us
                    </a>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileHover={{ x: 5 }}>
                    <Link to="#" className="text-gray-300 hover:text-[#B9D9EB] transition-colors flex items-center">
                      <span className="mr-2">›</span> Success Stories
                    </Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileHover={{ x: 5 }}>
                    <Link to="#" className="text-gray-300 hover:text-[#B9D9EB] transition-colors flex items-center">
                      <span className="mr-2">›</span> Contact
                    </Link>
                  </motion.div>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div className="col-span-1 md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6 text-white relative inline-block">
                Contact Us
                <div className="absolute bottom-0 left-0 h-1 w-full bg-[#B9D9EB]"></div>
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mr-3 mt-1 text-[#B9D9EB]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-300">
                      123 Pawsitive Lane<br />
                      Pet Haven, CA 91234
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 text-[#B9D9EB]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-300">(555) 123-4567</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 text-[#B9D9EB]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-300">info@pawsitiveplacements.com</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Newsletter */}
          <div className="col-span-1 md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6 text-white relative inline-block">
                Subscribe
                <div className="absolute bottom-0 left-0 h-1 w-full bg-[#B9D9EB]"></div>
              </h3>
              <p className="text-gray-300 mb-4">Subscribe to our newsletter for updates on adoptable pets and upcoming events.</p>
              <form className="space-y-3">
                <div>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 rounded bg-[#0a2d3c] border border-[#1a3e4c] focus:outline-none focus:ring-2 focus:ring-[#B9D9EB] text-white placeholder-gray-400"
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full bg-[#B9D9EB] hover:bg-white text-[#041E2B] font-medium py-2 px-4 rounded transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Copyright and Bottom Links */}
        <div className="border-t border-[#1a3e4c] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <motion.p 
            className="text-gray-400 text-sm mb-4 md:mb-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            © {currentYear} Pawsitive Placements. Made with <FaHeart className="inline text-[#B9D9EB] mx-1" /> for pets everywhere.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center space-x-4 text-sm text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Link to="#" className="hover:text-[#B9D9EB] transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-[#B9D9EB] transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-[#B9D9EB] transition-colors">Adoption Policy</Link>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;