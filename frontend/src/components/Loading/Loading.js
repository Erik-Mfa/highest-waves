import React from 'react';
import { FaSpinner } from 'react-icons/fa'; 

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center space-y-6">
      <FaSpinner className="animate-spin text-4xl text-cyan-500" />
    </div>
  );
};

export default Loading;
