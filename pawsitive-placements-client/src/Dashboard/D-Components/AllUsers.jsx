import { useState, useEffect } from 'react';
import { FaTrash, FaUserShield, FaUser, FaSort, FaSearch } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AllUsers = () => {
  // Sample data - replace with real data from your backend
  const [users, setUsers] = useState('');
  const axiosSecure = useAxiosSecure();
  

  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
   
    
    axiosSecure.get("/users")
      .then(res => {
        setUsers(res.data);
        
      })
     
      .finally(() => {
        
      });
  }, []);

  // Handle delete user
  const handleDelete = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
    // In a real app, you would call your API here
  };

  // Toggle admin status
  const toggleAdmin = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, isAdmin: !user.isAdmin } : user
    ));
    // In a real app, you would call your API here
  };

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Sort users
  const sortedUsers = [...users].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Filter users by search term
  const filteredUsers = sortedUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Format last login date
  const formatLastLogin = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="min-h-screen p-4 md:p-6 bg-[#B8E3E9]">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[#0B2E33] p-4 text-white">
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-[#93B1B5]">Manage all registered users</p>
        </div>

        {/* Search and Controls */}
        <div className="p-4 border-b border-[#93B1B5] flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-64">
            <FaSearch className="absolute left-3 top-3 text-[#4F7C82]" />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-[#93B1B5] focus:outline-none focus:ring-2 focus:ring-[#4F7C82]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="text-sm text-[#4F7C82]">
            Showing {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#93B1B5]">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#0B2E33] uppercase tracking-wider">
                  User
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-[#0B2E33] uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('email')}
                >
                  <div className="flex items-center">
                    Email
                    <FaSort className="ml-1 text-[#4F7C82]" />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-[#0B2E33] uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('lastLogin')}
                >
                  <div className="flex items-center">
                    Last Login
                    <FaSort className="ml-1 text-[#4F7C82]" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#0B2E33] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[#0B2E33] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#93B1B5]">
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-[#F8FAFC]">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={user.photo || 'https://via.placeholder.com/150'}
                            alt={user.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-[#0B2E33]">
                            {user.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-[#4F7C82]">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-[#4F7C82]">
                        {formatLastLogin(user.lastLogin)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.isAdmin
                            ? 'bg-[#0B2E33] text-white'
                            : 'bg-[#93B1B5] text-[#0B2E33]'
                        }`}
                      >
                        {user.isAdmin ? 'Admin' : 'User'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => toggleAdmin(user.id)}
                        className={`mr-3 p-2 rounded-full ${
                          user.isAdmin
                            ? 'bg-[#4F7C82] text-white'
                            : 'bg-[#B8E3E9] text-[#0B2E33]'
                        } hover:opacity-80 transition-opacity`}
                        title={user.isAdmin ? 'Revoke admin' : 'Make admin'}
                      >
                        {user.isAdmin ? <FaUserShield /> : <FaUser />}
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 rounded-full bg-[#FF6B6B] text-white hover:opacity-80 transition-opacity"
                        title="Delete user"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-[#4F7C82]">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredUsers.length > usersPerPage && (
          <div className="px-6 py-4 flex items-center justify-between border-t border-[#93B1B5]">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-[#93B1B5] text-sm font-medium rounded-md text-[#0B2E33] bg-white hover:bg-[#F8FAFC]"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-[#93B1B5] text-sm font-medium rounded-md text-[#0B2E33] bg-white hover:bg-[#F8FAFC]"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-[#4F7C82]">
                  Showing <span className="font-medium">{indexOfFirstUser + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastUser, filteredUsers.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredUsers.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-[#93B1B5] bg-white text-sm font-medium text-[#0B2E33] hover:bg-[#F8FAFC] disabled:opacity-50"
                  >
                    <span className="sr-only">First</span>
                    «
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 border border-[#93B1B5] bg-white text-sm font-medium text-[#0B2E33] hover:bg-[#F8FAFC] disabled:opacity-50"
                  >
                    <span className="sr-only">Previous</span>
                    ‹
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === page
                          ? 'bg-[#0B2E33] text-white border-[#0B2E33]'
                          : 'bg-white text-[#0B2E33] border-[#93B1B5] hover:bg-[#F8FAFC]'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 border border-[#93B1B5] bg-white text-sm font-medium text-[#0B2E33] hover:bg-[#F8FAFC] disabled:opacity-50"
                  >
                    <span className="sr-only">Next</span>
                    ›
                  </button>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-[#93B1B5] bg-white text-sm font-medium text-[#0B2E33] hover:bg-[#F8FAFC] disabled:opacity-50"
                  >
                    <span className="sr-only">Last</span>
                    »
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;