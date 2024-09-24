import React from 'react';

const SuccessMessage = ({ message, onProceed, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-md w-full">
        <p className="text-lg mb-6 font-bold text-green-600">{message}</p>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200"
          >
            Close
          </button>
          <button
            onClick={onProceed}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
