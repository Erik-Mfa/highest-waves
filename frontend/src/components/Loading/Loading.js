// ./src/components/Loading/Loading.js
import React from 'react';
import { FaSpinner } from 'react-icons/fa'; // Import the spinner icon

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      {/* Spinning Icon */}
      <FaSpinner className="animate-spin text-4xl text-cyan-500" />

      {/* Loading Text */}
      <div className="text-white text-2xl">Loading...</div>
    </div>
  );
};

export default Loading;
