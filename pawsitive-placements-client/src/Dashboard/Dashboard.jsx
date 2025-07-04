import { useState, useEffect, useContext, useRef } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IoDocuments } from "react-icons/io5";
import { 
  FaHome, FaBars, FaTimes, FaArrowLeft, FaPaw, 
  FaFileAlt, FaUsers, FaCog, FaSignOutAlt, 
  FaUserFriends,
  FaMoneyBill
} from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';
import useAdmin from '../hooks/useAdmin';

const Dashboard = () => {
  const isAdminHook = useAdmin([]);
  const isAdmin = isAdminHook[0];
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isDesktopNavCollapsed, setIsDesktopNavCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);
  const sidebarRef = useRef(null);

  console.log(isAdmin);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
      
      // Close mobile nav when resizing to desktop
      if (newWidth >= 768) {
        setIsMobileNavOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile nav when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (windowWidth < 768 && 
          isMobileNavOpen && 
          sidebarRef.current && 
          !sidebarRef.current.contains(event.target) &&
          !event.target.closest('.mobile-nav-button')) {
        setIsMobileNavOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileNavOpen, windowWidth]);

  const isMobile = windowWidth < 768;

  const navItems = [
    {path : '/dashboard/userHome', label: 'User Home', icon: <FaHome />},
    { path: '/dashboard/myAdoption', label: 'My Applications', icon: <FaFileAlt /> },
    { path: '/dashboard/paymentHistory', label: 'Payment History', icon: <FaMoneyBill></FaMoneyBill> },
    { path: '/dashboard/addReview', label: 'Add Review', icon: <FaUsers /> },
    { path: '/dashboard/settings', label: 'Settings', icon: <FaCog /> },
  ];

  const toggleNav = () => {
    if (isMobile) {
      setIsMobileNavOpen(!isMobileNavOpen);
    } else {
      setIsDesktopNavCollapsed(!isDesktopNavCollapsed);
    }
  };

  const closeMobileNav = () => {
    if (isMobile) {
      setIsMobileNavOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Nav Button - Only shows on mobile */}
      {isMobile && (
        <button
          onClick={toggleNav}
          className="mobile-nav-button md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-[#0B2E33] text-[#B8E3E9] shadow-lg"
        >
          <FaBars className="text-xl" />
        </button>
      )}

      {/* Desktop Collapse Button - Only shows on desktop */}
      {!isMobile && (
        <button
          onClick={toggleNav}
          className="hidden md:block fixed top-4 left-4 z-50 p-2 rounded-md bg-[#0B2E33] text-[#B8E3E9] shadow-lg"
        >
          {isDesktopNavCollapsed ? <FaBars /> : <FaTimes />}
        </button>
      )}

      {/* Sidebar/Navbar */}
      <AnimatePresence>
        {(isMobileNavOpen || !isDesktopNavCollapsed) && (
          <>
            {/* Overlay for mobile */}
            {isMobile && isMobileNavOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-30 bg-black md:hidden"
                onClick={closeMobileNav}
              />
            )}

            <motion.div
              ref={sidebarRef}
              initial={{ x: isMobile ? -250 : 0, opacity: 0 }}
              animate={{ 
                x: 0, 
                opacity: 1,
                width: isMobile ? 250 : isDesktopNavCollapsed ? 0 : 250
              }}
              exit={{ x: isMobile ? -250 : 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={`fixed md:relative inset-y-0 left-0 z-40 bg-[#0B2E33] text-[#B8E3E9] overflow-y-auto shadow-xl`}
              style={{ width: isMobile ? 250 : isDesktopNavCollapsed ? 0 : 250 }}
            >
              <div className="p-4 flex flex-col h-full">
                {/* Close button for mobile */}
                {isMobile && (
                  <button
                    onClick={closeMobileNav}
                    className="md:hidden self-end p-1 text-[#B8E3E9] hover:text-white"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                )}

                {/* Dashboard Header */}
                <div className="mb-8 flex items-center justify-center">
                  <div className="text-xl mt-10 font-bold whitespace-nowrap">
                    {(!isDesktopNavCollapsed || isMobile) && (
                      <div className='-mb-10'>
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
                      </div>
                    )}
                  </div>
                </div>

                {/* Return to Home Button */}
                <button
                  onClick={() => {
                    navigate('/');
                    closeMobileNav();
                  }}
                  className="mb-6 flex items-center gap-2 p-2 rounded-lg hover:bg-[#4F7C82] transition-colors whitespace-nowrap"
                >
                  <FaArrowLeft />
                  {(!isDesktopNavCollapsed || isMobile) && <span>Return to Home</span>}
                </button>

                {/* Navigation Items */}
                <nav className="flex-1">
                  <ul className="space-y-2">
                    {isAdmin ? (
                      <>
                        <li>
                          <Link
                            to={"/dashboard/adminHome"}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#4F7C82] transition-colors whitespace-nowrap"
                            onClick={closeMobileNav}
                          >
                            <span className="text-lg"><FaHome></FaHome></span>
                            {(!isDesktopNavCollapsed || isMobile) && <span>Admin Home</span>}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/dashboard/users"}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#4F7C82] transition-colors whitespace-nowrap"
                            onClick={closeMobileNav}
                          >
                            <span className="text-lg"><FaUserFriends /></span>
                            {(!isDesktopNavCollapsed || isMobile) && <span>Users</span>}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/dashboard/applications"}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#4F7C82] transition-colors whitespace-nowrap"
                            onClick={closeMobileNav}
                          >
                            <span className="text-lg"><IoDocuments /></span>
                            {(!isDesktopNavCollapsed || isMobile) && <span>Applications</span>}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/dashboard/addPets"}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#4F7C82] transition-colors whitespace-nowrap"
                            onClick={closeMobileNav}
                          >
                            <span className="text-lg"><FaPaw /></span>
                            {(!isDesktopNavCollapsed || isMobile) && <span>Add Pets</span>}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/dashboard/allPayments"}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#4F7C82] transition-colors whitespace-nowrap"
                            onClick={closeMobileNav}
                          >
                            <span className="text-lg"><FaMoneyBill></FaMoneyBill></span>
                            {(!isDesktopNavCollapsed || isMobile) && <span>All Payments</span>}
                          </Link>
                        </li>
                      </>
                    )  : (
                      navItems.map((item) => (
                        <li key={item.path}>
                          <Link
                            to={item.path}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#4F7C82] transition-colors whitespace-nowrap"
                            onClick={closeMobileNav}
                          >
                            <span className="text-lg">{item.icon}</span>
                            {(!isDesktopNavCollapsed || isMobile) && <span>{item.label}</span>}
                          </Link>
                        </li>
                      ))
                  )}

                   
                  </ul>
                </nav>

                {/* Footer/Logout */}
                <div className="mt-auto pt-4 border-t border-[#4F7C82]">
                  <button 
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[#4F7C82] transition-colors whitespace-nowrap"
                    onClick={closeMobileNav}
                  >
                    <span className="text-lg">
                      <FaSignOutAlt />
                    </span>
                    {(!isDesktopNavCollapsed || isMobile) && <span>Logout</span>}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div 
        className={`flex-1 overflow-auto transition-all duration-300 ${
          isMobile ? 'ml-0' : isDesktopNavCollapsed ? 'md:ml-0' : 'md:ml-[250px]'
        }`}
      >
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;