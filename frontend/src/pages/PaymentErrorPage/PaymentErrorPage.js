import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa'; // Import failure icon from react-icons
import { useNavigate, Link } from 'react-router-dom';

const PaymentErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-gray-900">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 md:p-12 max-w-xl text-center">
        <FaExclamationTriangle className="h-32 w-32 text-red-500 mx-auto mb-8 animate-bounce" />
        
        <h1 className="text-4xl font-bold text-red-300 mb-4">
          Internal Server Error!
        </h1>
        <p className="text-lg text-gray-300 mb-4">
          Oops! Something went wrong on our end. 
        </p>
        <p className="text-md text-gray-400 mb-6">
          Error Code: <span className="font-bold">500</span>
        </p>

        <button
            onClick={() => window.location.reload()} // Refresh the current page
            className="bg-red-600 text-white py-3 px-5 rounded-md shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out mb-4"
        >
          Retry
        </button>

        <p className="text-md text-gray-400 mb-4">
          If the issue persists, please check back later or 
          <Link to="/support" className="text-red-400 hover:underline"> contact support</Link>.
        </p>

        <div className="py-6 text-sm text-gray-500">
          <p>Need assistance? <Link to="/support" className="text-red-400 hover:underline">Contact Support</Link></p>
        </div>

        <button
            onClick={() => navigate('/')}
            className="bg-yellow-600 text-white py-3 px-5 rounded-md shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default PaymentErrorPage;
