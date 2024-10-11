import React from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // Import failure icon from react-icons
import { useNavigate, Link } from 'react-router-dom';

const PaymentSucessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-gray-900">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 md:p-12 max-w-xl text-center">
        <FaCheckCircle className="h-32 w-32 text-teal-400 mx-auto mb-8 animate-pulse" />
        
        <h1 className="text-4xl font-bold text-teal-200 mb-4">
          Payment Successful!
        </h1>
        <p className="text-lg text-gray-300 mb-4">
          Thank you for your purchase! Your payment has been processed successfully.
        </p>
        <p className="text-md text-gray-400 mb-6">
          A confirmation email has been sent to your registered email address.
        </p>

        <button
            onClick={() => navigate('/')}
            className="bg-teal-600 text-white py-3 px-5 rounded-md shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"
            >
            Go to Homepage
        </button>

        <div className="py-6 text-sm text-gray-500">
          <p>Need help? <Link to="/support" className="text-teal-400 hover:underline">Contact Support</Link></p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSucessPage;