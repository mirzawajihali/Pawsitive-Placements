import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-[#041E2B] opacity-90"></div>
      
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          className=" w-1/2 h-full object-cover opacity-50"
          src="https://images.unsplash.com/photo-1563460716037-460a3ad24ba9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Elegant dog portrait"
        />
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="pt-24 mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block">Find Your Perfect</span>
                <span className="block text-[#B9D9EB]">Companion</span>
              </h1>
              <p className="mt-3 text-base text-gray-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Give a loving home to a pet in need. Browse through our collection of adorable pets waiting for their forever families.
              </p>
              
              <div className="mt-8 sm:mt-12 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    to="/pets"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#353E43] hover:bg-[#2d353a] transition-colors duration-300 md:py-4 md:text-lg md:px-10"
                  >
                    Find Pets
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    to="/about"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-[#041E2B] bg-[#B9D9EB] hover:bg-[#a8c7d8] transition-colors duration-300 md:py-4 md:text-lg md:px-10"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      {/* Right side image with pets */}
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full relative sm:h-72 md:h-96 lg:w-full lg:h-full">
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1498&q=80"
            alt="Elegant pet portrait"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#041E2B] opacity-50"></div>
        </div>
      </div>
      
      {/* Elegant bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default Header; 