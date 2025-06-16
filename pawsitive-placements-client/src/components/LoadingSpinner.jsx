import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <div className="w-16 h-16 border-4 border-[#B9D9EB] border-t-[#0B2E33] rounded-full animate-spin"></div>
      <p className="mt-4 text-[#0B2E33] font-medium">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;