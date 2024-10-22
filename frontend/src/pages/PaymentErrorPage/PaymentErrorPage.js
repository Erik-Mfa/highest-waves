import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa' // Import failure icon from react-icons
import { useNavigate, Link } from 'react-router-dom'

const PaymentErrorPage = () => {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-xl rounded-lg bg-gray-800 p-8 text-center shadow-lg md:p-12">
        <FaExclamationTriangle className="mx-auto mb-8 size-32 animate-bounce text-red-500" />

        <h1 className="mb-4 text-4xl font-bold text-red-300">
          Internal Server Error!
        </h1>
        <p className="mb-4 text-lg text-gray-300">
          Oops! Something went wrong on our end.
        </p>
        <p className="text-md mb-6 text-gray-400">
          Error Code: <span className="font-bold">500</span>
        </p>

        <button
          onClick={() => window.location.reload()} // Refresh the current page
          className="mb-4 rounded-md bg-red-600 px-5 py-3 text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
        >
          Retry
        </button>

        <p className="text-md mb-4 text-gray-400">
          If the issue persists, please check back later or
          <Link to="/support" className="text-red-400 hover:underline">
            {' '}
            contact support
          </Link>
          .
        </p>

        <div className="py-6 text-sm text-gray-500">
          <p>
            Need assistance?{' '}
            <Link to="/support" className="text-red-400 hover:underline">
              Contact Support
            </Link>
          </p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="rounded-md bg-yellow-600 px-5 py-3 text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  )
}

export default PaymentErrorPage
