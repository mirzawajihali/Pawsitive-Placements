import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const UserCard = () => {

     const {user } = useContext(AuthContext)
    return (
        
           
  <div className="card card-side bg-base-100 my-10 shadow-xl w-full max-w-6xl mx-auto">
    {/* Avatar Section */}
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

      {/* Meta Information */}
      <div className="flex flex-wrap gap-4 mt-2">
        {user?.phoneNumber && (
          <div className="flex items-center gap-2 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>{user.phoneNumber}</span>
          </div>
        )}

        {user?.location && (
          <div className="flex items-center gap-2 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{user.location}</span>
          </div>
        )}
      </div>
    </div>

    {/* Stats Section */}
    <div className="p-6 flex flex-col justify-center border-l border-gray-200 min-w-[200px]">
      {user?.joinedDate && (
        <div className="mb-4">
          <p className="text-sm text-gray-500">Member Since</p>
          <p className="font-medium">
            {new Date(user.joinedDate).toLocaleDateString()}
          </p>
        </div>
      )}

      <div>
        <p className="text-sm text-gray-500">Status</p>
        {/* <span className={`badge ${user?.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
          {user?.status || 'inactive'}
        </span> */}
      </div>
    </div>
  </div>
);
       
};

export default UserCard;