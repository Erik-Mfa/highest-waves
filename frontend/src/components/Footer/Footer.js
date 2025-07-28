import React from 'react'
import { Link } from 'react-router-dom'
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn
} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer
      className="border-t-2 border-teal-950 py-8 text-white sm:py-10"
      style={{
        background:
          'linear-gradient(-120deg, rgba(10, 61, 64, 0.8) 2%, transparent 60%)'
      }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Main content grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Privacy and Security Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-200 sm:text-2xl lg:text-3xl">
              Privacy & Data Security
            </h2>
            <div className="space-y-3 text-sm text-slate-400 sm:text-base">
              <p>
                We respect your privacy and are committed to protecting your data
                in accordance with the latest privacy regulations, including the
                GDPR.
              </p>
              <p>
                By using our platform, you agree to our{' '}
                <Link
                  to="/terms"
                  className="text-cyan-400 underline hover:text-cyan-300"
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  to="/privacy"
                  className="text-cyan-400 underline hover:text-cyan-300"
                >
                  Privacy Policy
                </Link>
                .
              </p>
              <p className="text-xs text-slate-300">
                Your personal data is encrypted and securely processed to ensure
                that your information remains safe.
              </p>
            </div>
          </div>

          {/* About Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-200 sm:text-2xl lg:text-3xl">
              About Highest Waves
            </h2>
            <div className="space-y-3 text-sm text-slate-400 sm:text-base">
              <p>
                Highest Waves is your go-to platform for premium beats and
                high-quality music production. We offer a wide range of beats for
                artists, producers, and creators.
              </p>
              <p className="text-xs text-slate-300">
                &copy; 2024 Highest Waves. All rights reserved.
              </p>
            </div>
          </div>

          {/* Reach Us Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-200 sm:text-2xl lg:text-3xl">
              Reach Us
            </h2>
            <div className="space-y-4 text-sm text-slate-400 sm:text-base">
              <p>
                Stay updated with our latest news, exclusive offers, and new beat
                releases by following us on social media.
              </p>

              {/* Social Media Icons */}
              <div className="flex space-x-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition duration-300 hover:text-cyan-400"
                >
                  <FaTwitter size={24} className="sm:w-8 sm:h-8" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition duration-300 hover:text-cyan-400"
                >
                  <FaFacebookF size={24} className="sm:w-8 sm:h-8" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition duration-300 hover:text-cyan-400"
                >
                  <FaInstagram size={24} className="sm:w-8 sm:h-8" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition duration-300 hover:text-cyan-400"
                >
                  <FaLinkedinIn size={24} className="sm:w-8 sm:h-8" />
                </a>
              </div>

              {/* Email Subscription Form */}
              <form className="space-y-3">
                <button
                  type="submit"
                  className="w-full rounded-md bg-gradient-to-r from-[#4C687D] to-[#3F5366] px-4 py-2 text-gray-200 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl sm:w-auto"
                >
                  Subscribe
                </button>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full rounded-md border-2 border-transparent bg-[#2d3748] p-2 text-white shadow-sm transition-all duration-300 ease-in-out placeholder:text-gray-400 focus:border-[#5A7491] focus:shadow-md"
                />
              </form>

              <p className="text-xs text-slate-300">
                Built with passion by Highest Waves. Your beats, your way.
              </p>
            </div>
          </div>

          {/* Support Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-200 sm:text-2xl lg:text-3xl">
              Support
            </h2>
            <div className="space-y-3 text-sm text-slate-400 sm:text-base">
              <p>
                Need help with our website or your purchases? Visit our{' '}
                <Link
                  to="/support"
                  className="text-cyan-400 underline hover:text-cyan-300"
                >
                  Support Page
                </Link>{' '}
                for assistance.
              </p>
              <p>
                For additional inquiries, feel free to{' '}
                <Link
                  to="/contact"
                  className="text-cyan-400 underline hover:text-cyan-300"
                >
                  Contact Us
                </Link>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Logo section - full width at bottom */}
        <div className="mt-8 flex justify-center border-t border-teal-950 pt-8">
          <Link to="/" className="transition-transform duration-200 hover:scale-105">
            <img
              src="/assets/highestwaves-logo.png"
              alt="Highest Waves Logo"
              className="h-12 w-auto sm:h-16 lg:h-20"
            />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
