import React from 'react'
import { Link } from 'react-router-dom'; // Ensure you have React Router setup

// eslint-disable-next-line react/prop-types
const CannotPurchaseMessage = ({ onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-6 text-white shadow-lg">
        {/* Message displayed for unauthenticated users */}
        <p className="mb-6 text-lg text-center">
          You need to be logged in to purchase this beat. Please log in or create an account to continue.
        </p>

        <div className="flex justify-between">
          <button
            onClick={onCancel}
            className="transform rounded-lg bg-red-800 px-4 py-1 text-lg text-white transition-all duration-300 hover:scale-110 hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/50"
          >
            Cancel
          </button>

        <Link
            to="/login"
            className="transform rounded-lg bg-brand-blue-dark px-4 py-1 text-lg text-white transition-all duration-300 hover:scale-110 hover:bg-brand-blue hover:shadow-lg hover:shadow-brand-blue/50"
            style={{ fontFamily: '"REM"' }}
        >
            Login
        </Link>
        </div>
      </div>
    </div>
  )
}

export default CannotPurchaseMessage
