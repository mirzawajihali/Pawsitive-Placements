import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/LOGO.png'
import { HashLink } from 'react-router-hash-link';
import { AuthContext } from '../Provider/AuthProvider';
import { PiDogBold } from "react-icons/pi";
import useAdmin from '../hooks/useAdmin';


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdmin] = useAdmin();

  

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const {user, logOut} = useContext(AuthContext)

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img
              className="h-10 w-auto mr-2"
              src={logo}
              alt="Pawsitive Placements Logo"
            />
            <Link to="/" className={`text-2xl font-bold ${ isScrolled ? 'text-[#041E2B] hover:text-[#B9D9EB]' : 'text-white hover:text-[#B9D9EB]'}`}>
              Pawsitive Placements
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <div className="flex items-baseline space-x-4">
              <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium ${
                isScrolled ? 'text-[#041E2B] hover:text-[#B9D9EB]' : 'text-white hover:text-[#B9D9EB]'
              }`}>
                Home
              </Link>
              <HashLink to="/about" smooth className={`px-3 py-2 rounded-md text-sm font-medium ${
                isScrolled ? 'text-[#041E2B] hover:text-[#B9D9EB]' : 'text-white hover:text-[#B9D9EB]'
              }`}>
                About
              </HashLink>
              <Link to="/pets" className={`px-3 py-2 rounded-md text-sm font-medium ${
                isScrolled ? 'text-[#041E2B] hover:text-[#B9D9EB]' : 'text-white hover:text-[#B9D9EB]'
              }`}>
                Pets
              </Link>
              <Link to="/reviews" className={`px-3 py-2 rounded-md text-sm font-medium ${
                isScrolled ? 'text-[#041E2B] hover:text-[#B9D9EB]' : 'text-white hover:text-[#B9D9EB]'
              }`}>
                Reviews
              </Link>
              <Link to="/nearbyServices" className={`px-3 py-2 rounded-md text-sm font-medium ${
                isScrolled ? 'text-[#041E2B] hover:text-[#B9D9EB]' : 'text-white hover:text-[#B9D9EB]'
              }`}>
                Services
              </Link>
              <Link to="/contact" className={`px-3 py-2 rounded-md text-sm font-medium ${
                isScrolled ? 'text-[#041E2B] hover:text-[#B9D9EB]' : 'text-white hover:text-[#B9D9EB]'
              }`}>
                Contact
              </Link>
             {isAdmin ?  <Link to="/dashboard/adminHome" className={`px-3 py-2 rounded-md text-sm font-medium ${
                isScrolled ? 'text-[#041E2B] hover:text-[#B9D9EB]' : 'text-white hover:text-[#B9D9EB]'
              }`}>
                <button className="btn btn-sm">
  Dashboard <div className="badge badge-sm bg-[#B9D9EB] "><PiDogBold /></div>
</button>
              </Link> :  <Link to="/dashboard" className={`px-3 py-2 rounded-md text-sm font-medium ${
                isScrolled ? 'text-[#041E2B] hover:text-[#B9D9EB]' : 'text-white hover:text-[#B9D9EB]'
              }`}>
                <button className="btn btn-sm">
  Dashboard <div className="badge badge-sm bg-[#B9D9EB] "><PiDogBold /></div>
</button>
              </Link>}
            </div>
          
            
            {/* Login/Register Buttons */}
            {
              user ? <div className='flex gap-2 items-center'> 
              <img className='h-8 w-8 rounded-full border-2 ' src={user.photoURL} alt="" />
              <h2 className={`px-3 py-2 rounded-md text-mg font-bold ${
                isScrolled ? 'text-[#041E2B] hover:text-[#B9D9EB]' : 'text-white hover:text-[#B9D9EB]'
              }`} >   {user.displayName.split(' ')[0]}</h2>
              
                <button onClick={logOut} className="px-4 py-2 rounded-md text-sm font-medium bg-[#353E43] text-white hover:bg-[#041E2B] transition-colors duration-200">Logout</button></div>
              
              : <div className="flex items-center space-x-3 ml-4">
              <Link
                to="/login"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isScrolled
                    ? 'text-[#041E2B] border border-[#041E2B] hover:bg-[#041E2B] hover:text-white'
                    : 'text-white border border-white hover:bg-white hover:text-[#041E2B]'
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-md text-sm font-medium bg-[#353E43] text-white hover:bg-[#041E2B] transition-colors duration-200"
              >
                Register
              </Link>
            </div>
            }
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isScrolled ? 'text-[#041E2B]' : 'text-white'
              } hover:text-[#B9D9EB] focus:outline-none`}
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-[#041E2B] hover:text-[#B9D9EB]">
            Home
          </Link>
          <HashLink to="/#about" smooth className="block px-3 py-2 rounded-md text-base font-medium text-[#041E2B] hover:text-[#B9D9EB]">
            About
          </HashLink>
          <Link to="/pets" className="block px-3 py-2 rounded-md text-base font-medium text-[#041E2B] hover:text-[#B9D9EB]">
            Pets
          </Link>
          <Link to="/reviews" className="block px-3 py-2 rounded-md text-base font-medium text-[#041E2B] hover:text-[#B9D9EB]">Reviews</Link>
          <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-[#041E2B] hover:text-[#B9D9EB]">
            Contact
          </Link>
          {
            user? <div className="mt-4 flex flex-col space-y-2"><button onClick={logOut} className="block px-3 py-2 rounded-md text-base font-medium text-[#041E2B] border border-[#041E2B] text-center" >LogOut</button></div>
            : <div className="mt-4 flex flex-col space-y-2">
            <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-[#041E2B] border border-[#041E2B] text-center">
              Login
            </Link>
            <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium bg-[#353E43] text-white text-center">
              Register
            </Link>
          </div>
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 