import { useState, useEffect, useContext } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaHome, FaBars, FaTimes, FaArrowLeft, FaPaw, 
  FaFileAlt, FaUsers, FaCog, FaSignOutAlt 
} from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';

const Dashboard = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isDesktopNavCollapsed, setIsDesktopNavCollapsed] = useState(false);
  const navigate = useNavigate();
  const {user} = useContext(AuthContext)
  // Close mobile nav when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileNavOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { path: '/dashboard', label: 'Overview', icon: <FaHome /> },
    { path: '/dashboard/pets', label: 'Pets', icon: <FaPaw /> },
    { path: '/dashboard/applications', label: 'Applications', icon: <FaFileAlt /> },
    { path: '/dashboard/users', label: 'Users', icon: <FaUsers /> },
    { path: '/dashboard/settings', label: 'Settings', icon: <FaCog /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Nav Button - Only shows on mobile */}
      <button
        onClick={() => setIsMobileNavOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-[#0B2E33] text-[#B8E3E9] shadow-lg"
      >
        <FaBars className="text-xl" />
      </button>

      {/* Desktop Collapse Button - Only shows on desktop */}
      <button
        onClick={() => setIsDesktopNavCollapsed(!isDesktopNavCollapsed)}
        className="hidden md:block fixed top-4 left-4 z-50 p-2 rounded-md bg-[#0B2E33] text-[#B8E3E9] shadow-lg"
      >
        {isDesktopNavCollapsed ? <FaBars /> : <FaTimes />}
      </button>

      {/* Sidebar/Navbar */}
      <motion.div
        initial={false}
        animate={{
          width: isMobileNavOpen ? '250px' : isDesktopNavCollapsed ? '0px' : '250px',
          opacity: isMobileNavOpen ? 1 : isDesktopNavCollapsed ? 0 : 1,
          display: (isMobileNavOpen || !isDesktopNavCollapsed) ? 'block' : 'none',
        }}
        className={`fixed md:relative inset-y-0 left-0 z-40 bg-[#0B2E33] text-[#B8E3E9] overflow-y-auto transition-all duration-300 shadow-xl ${
          isMobileNavOpen ? 'block' : 'hidden md:block'
        }`}
      >
        <div className="p-4 flex flex-col h-full">
          {/* Close button for mobile */}
          <button
            onClick={() => setIsMobileNavOpen(false)}
            className="md:hidden self-end p-1 text-[#B8E3E9] hover:text-white"
          >
            <FaTimes className="text-xl" />
          </button>

          {/* Dashboard Header */}
          <div className="mb-8 flex items-center justify-center">
            <div className="text-xl mt-10 font-bold whitespace-nowrap">
              {!isDesktopNavCollapsed &&  <div className='-mb-10'>
                <figure className="p-6 min-w-[150px] flex items-center justify-center">
      {user?.photoURL ? (
        <img 
          src={user.photoURL} 
          alt={user.displayName || 'User avatar'} 
          className="w-24 h-24 rounded-full object-cover"
        />
      ) : (
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content rounded-full w-24">
            <span className="text-3xl">
              {user?.displayName?.charAt(0) || 'U'}
            </span>
          </div>
        </div>
      )}
    </figure>

    {/* Main Info Section */}
    <div className="card-body p-6 flex-grow">
      <h2 className="card-title text-2xl">
        {user?.displayName || 'Unknown User'}
        {user?.isVerified && (
          <div className="badge badge-primary ml-2">Verified</div>
        )}
      </h2>
      <p className="text-gray-600 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        {user?.email || 'No email provided'}
      </p>
    </div>
                </div>}
            </div>
          </div>

          {/* Return to Home Button */}
          <button
            onClick={() => navigate('/')}
            className="mb-6 flex items-center gap-2 p-2 rounded-lg hover:bg-[#4F7C82] transition-colors whitespace-nowrap"
          >
            <FaArrowLeft />
            {!isDesktopNavCollapsed && <span>Return to Home</span>}
          </button>

          {/* Navigation Items */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#4F7C82] transition-colors whitespace-nowrap"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {!isDesktopNavCollapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer/Logout */}
          <div className="mt-auto pt-4 border-t border-[#4F7C82]">
            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[#4F7C82] transition-colors whitespace-nowrap">
              <span className="text-lg">
                <FaSignOutAlt />
              </span>
              {!isDesktopNavCollapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className={`flex-1 overflow-auto transition-all duration-300 ${isDesktopNavCollapsed ? 'md:ml-0' : 'md:ml-64'}`}>
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;