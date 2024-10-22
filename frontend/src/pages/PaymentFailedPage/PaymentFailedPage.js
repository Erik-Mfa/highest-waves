import React from 'react'
import { FaTimesCircle } from 'react-icons/fa' // Import failure icon from react-icons
import { useNavigate, Link } from 'react-router-dom'

const PaymentFailedPage = () => {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-xl rounded-lg bg-gray-800 p-8 text-center shadow-lg md:p-12">
        <FaTimesCircle className="mx-auto mb-8 size-32 animate-pulse text-red-500" />

        <h1 className="mb-4 text-4xl font-bold text-red-300">
          Payment Failed!
        </h1>
        <p className="mb-4 text-lg text-gray-300">
          Unfortunately, your payment could not be processed.
        </p>
        <p className="text-md mb-6 text-gray-400">
          Please try again or contact our support if you continue to experience
          issues.
        </p>

        <button
          onClick={() => navigate('/')}
          className="rounded-md bg-red-600 px-5 py-3 text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
        >
          Go to Homepage
        </button>

        <div className="py-6 text-sm text-gray-500">
          <p>
            Need help?{' '}
            <Link to="/support" className="text-red-400 hover:underline">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default PaymentFailedPage
