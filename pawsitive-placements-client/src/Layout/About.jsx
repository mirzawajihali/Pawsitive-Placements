const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#4361EE] to-[#7209B7]">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover mix-blend-overlay opacity-30"
            src="https://images.unsplash.com/photo-1560743641-3914f2c45636?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
            alt="Happy pets"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 text-sm font-semibold bg-white text-[#4361EE] rounded-full mb-3">About Us</span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            About Pawsitive Placements
          </h1>
          <p className="mt-6 text-xl text-white max-w-3xl mx-auto">
            Making a difference in the lives of pets and people through adoption.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center relative">
          {/* Decorative paw prints */}
          <div className="hidden md:block absolute -left-16 top-0 text-[#FFD166] opacity-10 text-8xl">
            🐾
          </div>
          <div className="hidden md:block absolute -right-16 bottom-0 text-[#FFD166] opacity-10 text-8xl transform rotate-45">
            🐾
          </div>
          
          <span className="inline-block px-3 py-1 text-sm font-semibold bg-[#4361EE] bg-opacity-10 text-[#4361EE] rounded-full mb-2">Our Mission</span>
          <h2 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-[#4361EE] sm:text-4xl">
            Finding Forever Homes
          </h2>
          <p className="mt-4 max-w-3xl text-xl text-gray-500 lg:mx-auto">
            At Pawsitive Placements, we believe every pet deserves a loving home. Our mission is to connect
            wonderful pets with caring families, creating lasting bonds and happy endings.
          </p>
        </div>

        {/* Stats Section */}
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-gradient-to-br from-[#4361EE] to-[#7209B7] text-white p-8 rounded-xl shadow-lg transform transition-transform hover:scale-105">
              <div className="text-5xl font-bold">500+</div>
              <div className="mt-2 text-lg">Pets Adopted</div>
              <div className="w-16 h-1 bg-[#FFD166] mt-4"></div>
            </div>
            <div className="bg-gradient-to-br from-[#4361EE] to-[#7209B7] text-white p-8 rounded-xl shadow-lg transform transition-transform hover:scale-105">
              <div className="text-5xl font-bold">100+</div>
              <div className="mt-2 text-lg">Volunteers</div>
              <div className="w-16 h-1 bg-[#FFD166] mt-4"></div>
            </div>
            <div className="bg-gradient-to-br from-[#4361EE] to-[#7209B7] text-white p-8 rounded-xl shadow-lg transform transition-transform hover:scale-105">
              <div className="text-5xl font-bold">50+</div>
              <div className="mt-2 text-lg">Partner Shelters</div>
              <div className="w-16 h-1 bg-[#FFD166] mt-4"></div>
            </div>
            <div className="bg-gradient-to-br from-[#4361EE] to-[#7209B7] text-white p-8 rounded-xl shadow-lg transform transition-transform hover:scale-105">
              <div className="text-5xl font-bold">98%</div>
              <div className="mt-2 text-lg">Success Rate</div>
              <div className="w-16 h-1 bg-[#FFD166] mt-4"></div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 text-sm font-semibold bg-[#FF6B6B] bg-opacity-10 text-[#FF6B6B] rounded-full mb-2">Our Values</span>
            <h2 className="text-3xl font-extrabold text-gray-900">What Drives Us</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#FF6B6B] hover:shadow-xl transition-shadow">
              <div className="text-[#FF6B6B] text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Compassion</h3>
              <p className="text-gray-600">
                We treat every pet with love and respect, ensuring they receive the care they deserve throughout their journey to a forever home.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#4361EE] hover:shadow-xl transition-shadow">
              <div className="text-[#4361EE] text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Trust</h3>
              <p className="text-gray-600">
                We build lasting relationships with our community through transparency and honesty in all of our adoption practices.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#FFD166] hover:shadow-xl transition-shadow">
              <div className="text-[#FFD166] text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">
                We strive for the highest standards in pet care and adoption services, continuously improving our processes.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-24 bg-gray-50 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 text-sm font-semibold bg-[#7209B7] bg-opacity-10 text-[#7209B7] rounded-full mb-2">Our Team</span>
            <h2 className="text-3xl font-extrabold text-gray-900">Meet The People Who Care</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Our dedicated team works tirelessly to ensure every pet finds their perfect match.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-all hover:-translate-y-2">
              <div className="h-64 bg-gradient-to-br from-[#4361EE] to-[#7209B7] relative">
                <img
                  className="w-full h-full object-cover mix-blend-overlay"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80"
                  alt="Team member"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black opacity-60"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">Sarah Johnson</h3>
                  <p className="text-sm text-gray-300">Founder & Director</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600">
                  With over 15 years of experience in animal welfare, Sarah leads our team with passion and dedication.
                </p>
                <div className="mt-4 flex space-x-3">
                  <a href="#" className="text-[#4361EE] hover:text-[#7209B7]">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a href="#" className="text-[#4361EE] hover:text-[#7209B7]">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-[#4361EE] hover:text-[#7209B7]">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-all hover:-translate-y-2">
              <div className="h-64 bg-gradient-to-br from-[#4361EE] to-[#7209B7] relative">
                <img
                  className="w-full h-full object-cover mix-blend-overlay"
                  src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80"
                  alt="Team member"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black opacity-60"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">Michael Chen</h3>
                  <p className="text-sm text-gray-300">Adoption Coordinator</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600">
                  Michael ensures our adoption process is smooth and matches pets with their perfect forever families.
                </p>
                <div className="mt-4 flex space-x-3">
                  <a href="#" className="text-[#4361EE] hover:text-[#7209B7]">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a href="#" className="text-[#4361EE] hover:text-[#7209B7]">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-[#4361EE] hover:text-[#7209B7]">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-all hover:-translate-y-2">
              <div className="h-64 bg-gradient-to-br from-[#4361EE] to-[#7209B7] relative">
                <img
                  className="w-full h-full object-cover mix-blend-overlay"
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80"
                  alt="Team member"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black opacity-60"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">Emily Rodriguez</h3>
                  <p className="text-sm text-gray-300">Veterinary Care Specialist</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600">
                  Emily ensures all our animals receive top-notch medical care and are healthy for adoption.
                </p>
                <div className="mt-4 flex space-x-3">
                  <a href="#" className="text-[#4361EE] hover:text-[#7209B7]">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a href="#" className="text-[#4361EE] hover:text-[#7209B7]">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-[#4361EE] hover:text-[#7209B7]">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="mt-24 bg-gradient-to-r from-[#4361EE] to-[#7209B7] rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-12 md:py-16 md:px-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between">
            <div className="md:max-w-2xl">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Ready to find your new best friend?
              </h2>
              <p className="mt-4 text-lg text-white opacity-90">
                Browse our available pets and start your journey to pet parenthood today.
              </p>
            </div>
            <div className="mt-8 md:mt-0">
              <a href="/pets" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-[#4361EE] bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10 transition-colors duration-200">
                View Available Pets
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 