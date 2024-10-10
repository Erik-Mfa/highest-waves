import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="text-white py-10 border-t-2 border-teal-950" style={{ background: "linear-gradient(-120deg, rgba(10, 61, 64, 0.8) 2%, transparent 60%)" }}>
      <div className="container mx-auto px-6">
        {/* First row */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Privacy and Security Section */}
          <div className="flex-1">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-slate-200">Privacy & Data Security</h2>
            <p className="text-sm lg:text-md mb-4 text-slate-400">
              We respect your privacy and are committed to protecting your data in accordance with the latest privacy regulations, including the GDPR.
            </p>
            <p className="text-sm lg:text-md mb-4 text-slate-400">
              By using our platform, you agree to our <Link to="/terms" className="underline text-cyan-400 hover:text-cyan-300">Terms of Service</Link> and <Link to="/privacy" className="underline text-cyan-400 hover:text-cyan-300">Privacy Policy</Link>.
            </p>
            <p className="text-xs my-10 text-slate-300">
              Your personal data is encrypted and securely processed to ensure that your information remains safe.
            </p>
          </div>

          {/* Business Information Section */}
          <div className="flex-1">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-slate-200">About Highest Waves</h2>
            <p className="text-sm lg:text-md mb-4 text-slate-400">
              Highest Waves is your go-to platform for premium beats and high-quality music production. We offer a wide range of beats for artists, producers, and creators.
            </p>
            <p className="text-xs my-10 text-slate-300">&copy; 2024 Highest Waves. All rights reserved.</p>
          </div>
        </div>

        {/* Second row */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mt-10">
          {/* Reach Us Section */}
          <div className="text-center lg:text-left">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-slate-200">Reach Us</h2>
            <p className="text-sm lg:text-md mb-6 text-slate-400">
              Stay updated with our latest news, exclusive offers, and new beat releases by following us on social media.
            </p>

            {/* Social Media Icons */}
            <div className="flex justify-center lg:justify-start space-x-6 mb-6">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter size={32} className="hover:text-cyan-400 transition duration-300" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF size={32} className="hover:text-cyan-400 transition duration-300" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={32} className="hover:text-cyan-400 transition duration-300" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn size={32} className="hover:text-cyan-400 transition duration-300" />
              </a>
            </div>

            {/* Email Subscription Form */}
            <form className="flex flex-col lg:flex-row items-center gap-4 w-full justify-center lg:justify-start">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full lg:w-auto p-3 rounded-md border-2 border-transparent focus:border-[#5A7491] bg-[#2d3748] text-white placeholder-gray-400 shadow-sm focus:shadow-md transition-all duration-300 ease-in-out"
              />
              <button 
                type="submit" 
                className="bg-gradient-to-r from-[#4C687D] to-[#3F5366] text-gray-200 py-3 px-5 rounded-md shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"
              >
                Subscribe
              </button>
            </form>

            <div className="py-6 text-xs lg:text-sm text-slate-300">
              <p>Built with passion by Highest Waves. Your beats, your way.</p>
            </div>
          </div>

          {/* Support and Navigation Section */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-slate-200">Support</h2>
            <p className="text-sm lg:text-md mb-4 text-slate-400">
              Need help with our website or your purchases? Visit our <Link to="/support" className="underline text-cyan-400 hover:text-cyan-300">Support Page</Link> for assistance.
            </p>
            <p className="text-sm lg:text-md mb-4 text-slate-400">
              For additional inquiries, feel free to <Link to="/contact" className="underline text-cyan-400 hover:text-cyan-300">Contact Us</Link>.
            </p>
          </div>

          {/* Logo */}
          <div className="flex-1 text-center lg:text-left">
            <ul>
              <li>
                <Link to='/'>
                  <img 
                    src='/assets/highestwaves-logo.png' 
                    alt='Highest Waves Logo' 
                    className="w-48 lg:w-64 mx-auto lg:mx-0 hover:scale-105 transition-transform duration-200" 
                  />
                </Link>
              </li>
            </ul>
          </div>  
        </div>
      </div>   
    </footer>
  );
};

export default Footer;
