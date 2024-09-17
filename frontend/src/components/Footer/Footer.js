import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="text-white py-10 border-t-2 border-l-2 border-gray-700" style={{ background: "linear-gradient(-120deg, rgba(10, 61, 64, 0.8) 2%, transparent 60%)" }}>
      <div className="container mx-auto px-6">
        {/* First row */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          {/* Privacy and Security Section */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4 text-slate-200">Privacy & Data Security</h2>
            <p className="text-md mb-4 text-slate-400">
              We respect your privacy and are committed to protecting your data in accordance with the latest privacy regulations, including the GDPR.
            </p>
            <p className="text-md mb-4 text-slate-400">
              By using our platform, you agree to our <a href="#" className="underline text-cyan-400 hover:text-cyan-300">Terms of Service</a> and <a href="#" className="underline text-cyan-400 hover:text-cyan-300">Privacy Policy</a>.
            </p>
            <p className="text-xs my-10 text-slate-300">
              Your personal data is encrypted and securely processed to ensure that your information remains safe.
            </p>
          </div>


          {/* Business Information Section */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4 text-slate-200">About Highest Waves</h2>
            <p className="text-md mb-4 text-slate-400">
              Highest Waves is your go-to platform for premium beats and high-quality music production. We offer a wide range of beats for artists, producers, and creators.
            </p>
            <p className="text-xs my-10 text-slate-300">&copy; 2024 Highest Waves. All rights reserved.</p>
          </div>

        </div>

        {/* Second row */}
        
        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          {/* Reach Us Section */}
          <div>
            <h2 className="text-3xl font-bold mb-4 text-slate-200">Reach Us</h2>
            <p className="text-md mb-6 text-slate-400">
              Stay updated with our latest news, exclusive offers, and new beat releases by following us on social media.
            </p>

            <div className="flex space-x-6 mb-6">
              <FaTwitter size={32} className="hover:text-cyan-400 transition duration-300" />
              <FaFacebookF size={32} className="hover:text-cyan-400 transition duration-300" />
              <FaInstagram size={32} className="hover:text-cyan-400 transition duration-300" />
              <FaLinkedinIn size={32} className="hover:text-cyan-400 transition duration-300" />
            </div>

            <form className="flex flex-col md:flex-row items-center gap-4 w-full">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full md:w-auto p-3 rounded-md border-2 border-transparent focus:border-[#5A7491] bg-[#2d3748] text-white placeholder-gray-400 shadow-sm focus:shadow-md transition-all duration-300 ease-in-out"
              />
              <button 
                type="submit" 
                className="bg-gradient-to-r from-[#4C687D] to-[#3F5366] text-gray-200 py-3 px-5 rounded-md shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"
              >
                Subscribe
              </button>
            </form>

            <div className="py-6 text-sm text-slate-300">
              <p>Built with passion by Highest Waves. Your beats, your way.</p>
            </div>
        </div>

        {/* Logo */}
        <ul>
          <li>
            <Link to='/'>
              <img 
                src='/assets/highestwaves-logo.png' 
                alt='Highest Waves Logo' 
                className="w-64 ml-44 hover:scale-105 transition-transform duration-200" 
              />
            </Link>
          </li>
        </ul>

      </div>
     </div>   

    </footer>
  );
};

export default Footer;
