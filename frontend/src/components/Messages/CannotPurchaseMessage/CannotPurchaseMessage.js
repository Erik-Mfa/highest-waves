import React from 'react'
import { Link } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const CannotPurchaseMessage = ({ onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-6 text-white shadow-lg">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-xl font-bold text-white mb-4">Login Required</h2>
          <p className="text-white">
            You need to be logged in to purchase this beat. Please log in or create an account to continue.
          </p>
        </div>

        <div className="flex justify-between">
          <button
            onClick={onCancel}
            className="rounded-md bg-gray-500 px-4 py-2 text-white transition duration-200 hover:bg-gray-600"
          >
            Cancel
          </button>

          <Link
            to="/login"
            className="rounded-md bg-brand-blue px-4 py-2 text-white transition duration-200 hover:bg-brand-blue-dark inline-flex items-center"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CannotPurchaseMessage
