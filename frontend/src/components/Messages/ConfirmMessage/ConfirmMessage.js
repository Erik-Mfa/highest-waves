import React from 'react';

const ConfirmMessage = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-md w-full">

        {/* The message will be displayed here */}
        <p className="text-lg mb-6">{message}</p>
        
        <div className="flex justify-between">

          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
          >
            Confirm
          </button>

        </div>
      </div>
    </div>
  );
};

export default ConfirmMessage;
