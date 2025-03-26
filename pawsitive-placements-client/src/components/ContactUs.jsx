import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <section className=" bg-gray-50">
      <div className="max-w-7xl h-16 mx-auto bg-black">
      

      </div>
      <div className="max-w-7xl  my-6 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          className="text-center mb-16"
         
        >
          <span className="inline-block px-3 py-1 text-sm font-semibold bg-[#041E2B] text-white rounded-lg mb-2">
            Contact Us
          </span>
          <h2 className="text-4xl font-bold text-[#041E2B] mb-4">
            Get in Touch
          </h2>
          <div className="w-24 h-1 bg-[#B9D9EB] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div
           
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-bold text-[#041E2B] mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#041E2B] text-white">
                    <FaMapMarkerAlt className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-[#041E2B]">Address</h4>
                  <p className="mt-1 text-[#353E43]">
                    123 Pawsitive Lane<br />
                    Pet Haven, CA 91234
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#041E2B] text-white">
                    <FaPhone className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-[#041E2B]">Phone</h4>
                  <p className="mt-1 text-[#353E43]">(555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#041E2B] text-white">
                    <FaEnvelope className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-[#041E2B]">Email</h4>
                  <p className="mt-1 text-[#353E43]">info@pawsitiveplacements.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#041E2B] text-white">
                    <FaClock className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-[#041E2B]">Hours</h4>
                  <p className="mt-1 text-[#353E43]">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-[#041E2B] mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  whileHover={{ y: -3 }}
                  className="text-[#353E43] hover:text-[#041E2B] transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ y: -3 }}
                  className="text-[#353E43] hover:text-[#041E2B] transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.09 1.064.077 1.791.232 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.233.636.388 1.363.465 2.427.067 1.067.09 1.407.09 4.123v.08c0 2.643-.012 2.987-.09 4.043-.077 1.064-.232 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.233-1.363.388-2.427.465-1.067.067-1.407.09-4.123.09h-.08c-2.643 0-2.987-.012-4.043-.09-1.064-.077-1.791-.232-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.233-.636-.388-1.363-.465-2.427-.07-1.067-.09-1.407-.09-4.123v-.08c0-2.643.012-2.987.09-4.043.077-1.064.232-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.233 1.363-.388 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ y: -3 }}
                  className="text-[#353E43] hover:text-[#041E2B] transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </motion.a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
          
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-bold text-[#041E2B] mb-6">Send us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#353E43]">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#B9D9EB] focus:ring-[#B9D9EB]"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#353E43]">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#B9D9EB] focus:ring-[#B9D9EB]"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-[#353E43]">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#B9D9EB] focus:ring-[#B9D9EB]"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#353E43]">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#B9D9EB] focus:ring-[#B9D9EB]"
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="w-full bg-[#041E2B] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#353E43] transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 rounded-xl overflow-hidden shadow-lg"
        >
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7305.696401993071!2d90.40305015!3d23.717114300000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8fd46c31205%3A0xf7b6fb1e0624cd61!2sBangshal%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1742980097948!5m2!1sen!2sbd"
         width="100%" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs; 