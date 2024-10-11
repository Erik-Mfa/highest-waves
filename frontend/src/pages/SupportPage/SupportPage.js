import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa'; // Support icon from react-icons
import { useNavigate, Link } from 'react-router-dom';

const SupportPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-gray-900 p-10">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 md:p-12 max-w-3xl text-center">
        <FaQuestionCircle className="h-32 w-32 text-teal-400 mx-auto mb-8 animate-bounce" />
        
        <h1 className="text-4xl font-bold text-teal-200 mb-4">Support Center</h1>
        <p className="text-lg text-gray-300 mb-6">
          Welcome to the Highest Waves Support Center. We're here to help you with any issues you may encounter while using our platform. Please refer to the sections below for specific assistance.
        </p>

        {/* Support Sections */}
        <div className="text-left text-gray-300 space-y-6">

          {/* Website Issues */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-400 mb-2">Website Issues</h2>
            <p className="text-md text-gray-400 mb-4">
              If you're experiencing problems with our website, such as loading issues, broken links, or functionality not working as expected, please try the following:
            </p>
            <ul className="list-disc list-inside text-gray-400">
              <li>Clear your browser cache and cookies.</li>
              <li>Ensure you have a stable internet connection.</li>
              <li>Try using a different browser (Chrome, Firefox, etc.).</li>
              <li>Contact support if the issue persists: <a href="mailto:support@highestwaves.com" className="text-teal-400 hover:underline">support@highestwaves.com</a></li>
            </ul>
          </div>

          {/* Purchase Problems */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-400 mb-2">Purchase Problems</h2>
            <p className="text-md text-gray-400 mb-4">
              If you're having trouble with a purchase, such as payment failures, order confirmation issues, or problems accessing your beats, follow these steps:
            </p>
            <ul className="list-disc list-inside text-gray-400">
              <li>Verify that your payment method is valid and up-to-date.</li>
              <li>Check your email for order confirmation. If you didn't receive one, check your spam folder.</li>
              <li>If you're unable to download or access your beats, try refreshing the page or logging in again.</li>
              <li>Still having trouble? Reach out to us at: <a href="mailto:support@highestwaves.com" className="text-teal-400 hover:underline">support@highestwaves.com</a></li>
            </ul>
          </div>

          {/* General Help */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-400 mb-2">General Help</h2>
            <p className="text-md text-gray-400 mb-4">
              For any other questions or concerns, whether it's account management, using the platform, or understanding our services, we're happy to assist.
            </p>
            <ul className="list-disc list-inside text-gray-400">
              <li>Visit our <Link to="/faq" className="text-teal-400 hover:underline">FAQ page</Link> for frequently asked questions.</li>
              <li>For immediate assistance, email us at: <a href="mailto:support@highestwaves.com" className="text-teal-400 hover:underline">support@highestwaves.com</a></li>
              <li>Call our support line: +1 (800) 123-4567</li>
            </ul>
          </div>
        </div>

        {/* Back to Homepage Button */}
        <div className="mt-8">
          <button
            onClick={() => navigate('/')}
            className="bg-teal-600 text-white py-3 px-5 rounded-md shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
