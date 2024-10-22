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
      className="border-t-2 border-teal-950 py-10 text-white"
      style={{
        background:
          'linear-gradient(-120deg, rgba(10, 61, 64, 0.8) 2%, transparent 60%)'
      }}
    >
      <div className="container mx-auto px-6">
        {/* First row */}
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Privacy and Security Section */}
          <div className="flex-1">
            <h2 className="mb-4 text-2xl font-bold text-slate-200 lg:text-3xl">
              Privacy & Data Security
            </h2>
            <p className="lg:text-md mb-4 text-sm text-slate-400">
              We respect your privacy and are committed to protecting your data
              in accordance with the latest privacy regulations, including the
              GDPR.
            </p>
            <p className="lg:text-md mb-4 text-sm text-slate-400">
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
            <p className="my-10 text-xs text-slate-300">
              Your personal data is encrypted and securely processed to ensure
              that your information remains safe.
            </p>
          </div>

          {/* Business Information Section */}
          <div className="flex-1">
            <h2 className="mb-4 text-2xl font-bold text-slate-200 lg:text-3xl">
              About Highest Waves
            </h2>
            <p className="lg:text-md mb-4 text-sm text-slate-400">
              Highest Waves is your go-to platform for premium beats and
              high-quality music production. We offer a wide range of beats for
              artists, producers, and creators.
            </p>
            <p className="my-10 text-xs text-slate-300">
              &copy; 2024 Highest Waves. All rights reserved.
            </p>
          </div>
        </div>

        {/* Second row */}
        <div className="mt-10 flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Reach Us Section */}
          <div className="text-center lg:text-left">
            <h2 className="mb-4 text-2xl font-bold text-slate-200 lg:text-3xl">
              Reach Us
            </h2>
            <p className="lg:text-md mb-6 text-sm text-slate-400">
              Stay updated with our latest news, exclusive offers, and new beat
              releases by following us on social media.
            </p>

            {/* Social Media Icons */}
            <div className="mb-6 flex justify-center space-x-6 lg:justify-start">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter
                  size={32}
                  className="transition duration-300 hover:text-cyan-400"
                />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF
                  size={32}
                  className="transition duration-300 hover:text-cyan-400"
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram
                  size={32}
                  className="transition duration-300 hover:text-cyan-400"
                />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn
                  size={32}
                  className="transition duration-300 hover:text-cyan-400"
                />
              </a>
            </div>

            {/* Email Subscription Form */}
            <form className="flex w-full flex-col items-center justify-center gap-4 lg:flex-row lg:justify-start">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full rounded-md border-2 border-transparent bg-[#2d3748] p-3 text-white shadow-sm transition-all duration-300 ease-in-out placeholder:text-gray-400 focus:border-[#5A7491] focus:shadow-md lg:w-auto"
              />
              <button
                type="submit"
                className="rounded-md bg-gradient-to-r from-[#4C687D] to-[#3F5366] px-5 py-3 text-gray-200 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
              >
                Subscribe
              </button>
            </form>

            <div className="py-6 text-xs text-slate-300 lg:text-sm">
              <p>Built with passion by Highest Waves. Your beats, your way.</p>
            </div>
          </div>

          {/* Support and Navigation Section */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="mb-4 text-2xl font-bold text-slate-200 lg:text-3xl">
              Support
            </h2>
            <p className="lg:text-md mb-4 text-sm text-slate-400">
              Need help with our website or your purchases? Visit our{' '}
              <Link
                to="/support"
                className="text-cyan-400 underline hover:text-cyan-300"
              >
                Support Page
              </Link>{' '}
              for assistance.
            </p>
            <p className="lg:text-md mb-4 text-sm text-slate-400">
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

          {/* Logo */}
          <div className="flex-1 text-center lg:text-left">
            <ul>
              <li>
                <Link to="/">
                  <img
                    src="/assets/highestwaves-logo.png"
                    alt="Highest Waves Logo"
                    className="mx-auto w-48 transition-transform duration-200 hover:scale-105 lg:mx-0 lg:w-64"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
