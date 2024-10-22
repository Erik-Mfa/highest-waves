import React from 'react'

// eslint-disable-next-line react/prop-types
const ConfirmMessage = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-6 text-white shadow-lg">
        {/* The message will be displayed here */}
        <p className="mb-6 text-lg">{message}</p>

        <div className="flex justify-between">
          <button
            onClick={onCancel}
            className="rounded-md bg-gray-500 px-4 py-2 text-white transition duration-200 hover:bg-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-md bg-red-600 px-4 py-2 text-white transition duration-200 hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmMessage
