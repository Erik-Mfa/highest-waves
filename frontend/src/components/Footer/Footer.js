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
      className="border-t-2 border-[#124D82] py-12 text-white sm:py-16"
      style={{
        background: '#0B1420'
      }}
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Main content grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Privacy and Security Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[#FFFFFF] sm:text-2xl lg:text-3xl" style={{ fontFamily: 'Aloevera Display, -apple-system, BlinkMacSystemFont, sans-serif' }}>
              Privacy & Data Security
            </h2>
            <div className="space-y-4 text-sm text-[#6C757D] sm:text-base" style={{ fontFamily: 'Aloevera Display, -apple-system, BlinkMacSystemFont, sans-serif' }}>
              <p>
                We respect your privacy and are committed to protecting your data
                in accordance with the latest privacy regulations, including the
                GDPR.
              </p>
              <p>
                By using our platform, you agree to our{' '}
                <Link
                  to="/terms"
                  className="text-[#3876AE] underline hover:text-[#124D82] transition-colors duration-300"
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  to="/privacy"
                  className="text-[#3876AE] underline hover:text-[#124D82] transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
                .
              </p>
              <p className="text-xs text-[#495057]">
                Your personal data is encrypted and securely processed to ensure
                that your information remains safe.
              </p>
            </div>
          </div>

          {/* About Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[#FFFFFF] sm:text-2xl lg:text-3xl" style={{ fontFamily: 'Aloevera Display, -apple-system, BlinkMacSystemFont, sans-serif' }}>
              About Highest Waves
            </h2>
            <div className="space-y-4 text-sm text-[#6C757D] sm:text-base" style={{ fontFamily: 'Aloevera Display, -apple-system, BlinkMacSystemFont, sans-serif' }}>
              <p>
                Highest Waves is your go-to platform for premium beats and
                high-quality music production. We offer a wide range of beats for
                artists, producers, and creators.
              </p>
              <p className="text-xs text-[#495057]">
                &copy; 2024 Highest Waves. All rights reserved.
              </p>
            </div>
          </div>

          {/* Reach Us Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[#FFFFFF] sm:text-2xl lg:text-3xl" style={{ fontFamily: 'Aloevera Display, -apple-system, BlinkMacSystemFont, sans-serif' }}>
              Reach Us
            </h2>
            <div className="space-y-6 text-sm text-[#6C757D] sm:text-base" style={{ fontFamily: 'Aloevera Display, -apple-system, BlinkMacSystemFont, sans-serif' }}>
              <p>
                Stay updated with our latest news, exclusive offers, and new beat
                releases by following us on social media.
              </p>

              {/* Social Media Icons */}
              <div className="flex space-x-6">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition duration-300 hover:text-[#3876AE] hover:scale-110"
                >
                  <FaTwitter size={28} className="sm:w-8 sm:h-8" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition duration-300 hover:text-[#3876AE] hover:scale-110"
                >
                  <FaFacebookF size={28} className="sm:w-8 sm:h-8" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition duration-300 hover:text-[#3876AE] hover:scale-110"
                >
                  <FaInstagram size={28} className="sm:w-8 sm:h-8" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition duration-300 hover:text-[#3876AE] hover:scale-110"
                >
                  <FaLinkedinIn size={28} className="sm:w-8 sm:h-8" />
                </a>
              </div>

              {/* Email Subscription Form */}
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full rounded-lg border-2 border-[#495057] bg-[#0B1420] p-3 text-[#FFFFFF] shadow-sm transition-all duration-300 ease-in-out placeholder:text-[#6C757D] focus:border-[#3876AE] focus:shadow-md focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full rounded-lg bg-[#3876AE] px-6 py-3 text-[#FFFFFF] font-medium shadow-lg transition-all duration-300 ease-in-out hover:bg-[#124D82] hover:scale-105 hover:shadow-xl sm:w-auto"
                  style={{ fontFamily: 'Aloevera Display, -apple-system, BlinkMacSystemFont, sans-serif' }}
                >
                  Subscribe
                </button>
              </form>

              <p className="text-xs text-[#495057]">
                Built with passion by Highest Waves. Your beats, your way.
              </p>
            </div>
          </div>

          {/* Support Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[#FFFFFF] sm:text-2xl lg:text-3xl" style={{ fontFamily: 'Aloevera Display, -apple-system, BlinkMacSystemFont, sans-serif' }}>
              Support
            </h2>
            <div className="space-y-4 text-sm text-[#6C757D] sm:text-base" style={{ fontFamily: 'Aloevera Display, -apple-system, BlinkMacSystemFont, sans-serif' }}>
              <p>
                Need help with our website or your purchases? Visit our{' '}
                <Link
                  to="/support"
                  className="text-[#3876AE] underline hover:text-[#124D82] transition-colors duration-300"
                >
                  Support Page
                </Link>{' '}
                for assistance.
              </p>
              <p>
                For additional inquiries, feel free to{' '}
                <Link
                  to="/contact"
                  className="text-[#3876AE] underline hover:text-[#124D82] transition-colors duration-300"
                >
                  Contact Us
                </Link>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Logo section - full width at bottom */}
        <div className="mt-12 flex justify-center border-t border-[#124D82] pt-12">
          <Link to="/" className="transition-transform duration-300 hover:scale-110">
            <img
              src={`${process.env.PUBLIC_URL || ''}/assets/highestwaves-white-logo.png`}
              alt="Highest Waves Logo"
              className="h-16 w-auto sm:h-20 lg:h-24"
            />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
