import React from 'react'

// eslint-disable-next-line react/prop-types
const SuccessMessage = ({ message, onProceed, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 text-black shadow-lg">
        <p className="mb-6 text-lg font-bold text-green-600">{message}</p>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="rounded-md bg-gray-500 px-4 py-2 text-white transition duration-200 hover:bg-gray-600"
          >
            Close
          </button>
          <button
            onClick={onProceed}
            className="rounded-md bg-green-600 px-4 py-2 text-white transition duration-200 hover:bg-green-700"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  )
}

export default SuccessMessage
