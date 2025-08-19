/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { FaQuestionCircle } from 'react-icons/fa' // Support icon from react-icons
import { useNavigate, Link } from 'react-router-dom'

const SupportPage = () => {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-black to-gray-900 p-10">
      <div className="max-w-3xl rounded-lg bg-gray-800 p-8 text-center shadow-lg md:p-12">
        <FaQuestionCircle className="mx-auto mb-8 size-32 animate-bounce text-brand-blue" />

        <h1 className="mb-4 text-4xl font-bold text-brand-blue">
          Support Center
        </h1>
        <p className="mb-6 text-lg text-gray-300">
          Welcome to the Highest Waves Support Center. We're here to help you
          with any issues you may encounter while using our platform. Please
          refer to the sections below for specific assistance.
        </p>

        {/* Support Sections */}
        <div className="space-y-6 text-left text-gray-300">
          {/* Website Issues */}
          <div>
            <h2 className="mb-2 text-2xl font-semibold text-brand-blue">
              Website Issues
            </h2>
            <p className="text-md mb-4 text-gray-400">
              If you're experiencing problems with our website, such as loading
              issues, broken links, or functionality not working as expected,
              please try the following:
            </p>
            <ul className="list-inside list-disc text-gray-400">
              <li>Clear your browser cache and cookies.</li>
              <li>Ensure you have a stable internet connection.</li>
              <li>Try using a different browser (Chrome, Firefox, etc.).</li>
              <li>
                Contact support if the issue persists:{' '}
                <a
                  href="mailto:support@highestwaves.com"
                  className="text-brand-blue hover:underline"
                >
                  support@highestwaves.com
                </a>
              </li>
            </ul>
          </div>

          {/* Purchase Problems */}
          <div>
            <h2 className="mb-2 text-2xl font-semibold text-brand-blue">
              Purchase Problems
            </h2>
            <p className="text-md mb-4 text-gray-400">
              If you're having trouble with a purchase, such as payment
              failures, order confirmation issues, or problems accessing your
              beats, follow these steps:
            </p>
            <ul className="list-inside list-disc text-gray-400">
              <li>Verify that your payment method is valid and up-to-date.</li>
              <li>
                Check your email for order confirmation. If you didn't receive
                one, check your spam folder.
              </li>
              <li>
                If you're unable to download or access your beats, try
                refreshing the page or logging in again.
              </li>
              <li>
                Still having trouble? Reach out to us at:{' '}
                <a
                  href="mailto:support@highestwaves.com"
                  className="text-brand-blue hover:underline"
                >
                  support@highestwaves.com
                </a>
              </li>
            </ul>
          </div>

          {/* General Help */}
          <div>
            <h2 className="mb-2 text-2xl font-semibold text-brand-blue">
              General Help
            </h2>
            <p className="text-md mb-4 text-gray-400">
              For any other questions or concerns, whether it's account
              management, using the platform, or understanding our services,
              we're happy to assist.
            </p>
            <ul className="list-inside list-disc text-gray-400">
              <li>
                Visit our{' '}
                <Link to="/faq" className="text-brand-blue hover:underline">
                  FAQ page
                </Link>{' '}
                for frequently asked questions.
              </li>
              <li>
                For immediate assistance, email us at:{' '}
                <a
                  href="mailto:support@highestwaves.com"
                  className="text-brand-blue hover:underline"
                >
                  support@highestwaves.com
                </a>
              </li>
              <li>Call our support line: +1 (800) 123-4567</li>
            </ul>
          </div>
        </div>

        {/* Back to Homepage Button */}
        <div className="mt-8">
          <button
            onClick={() => navigate('/')}
            className="rounded-md bg-brand-blue px-5 py-3 text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  )
}

export default SupportPage
