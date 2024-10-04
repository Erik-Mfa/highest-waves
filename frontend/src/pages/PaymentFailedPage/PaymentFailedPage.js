import React from 'react';
import { FaTimesCircle } from 'react-icons/fa'; // Import failure icon from react-icons
import { useNavigate, Link } from 'react-router-dom';

const PaymentFailedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-gray-900">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 md:p-12 max-w-xl text-center">
        <FaTimesCircle className="h-32 w-32 text-red-500 mx-auto mb-8 animate-pulse" />
        
        <h1 className="text-4xl font-bold text-red-300 mb-4">
          Payment Failed!
        </h1>
        <p className="text-lg text-gray-300 mb-4">
          Unfortunately, your payment could not be processed.
        </p>
        <p className="text-md text-gray-400 mb-6">
          Please try again or contact our support if you continue to experience issues.
        </p>

        <button
            onClick={() => navigate('/')}
            className="bg-red-600 text-white py-3 px-5 rounded-md shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"
        >
          Go to Homepage
        </button>

        <div className="py-6 text-sm text-gray-500">
          <p>Need help? <Link to="/support" className="text-red-400 hover:underline">Contact Support</Link></p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailedPage;
