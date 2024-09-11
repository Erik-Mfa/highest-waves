import React from 'react';
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="text-white py-20 bg-brown">
  <div className="container mx-auto px-6 md:px-12">
    <div className="flex flex-col md:flex-row gap-12 md:gap-16">

      {/* Social Media Section */}
      <div className="flex-1 flex flex-col items-center md:items-start">
        <h2 className="text-4xl font-bold mb-6">Follow Us</h2>
        <p className="text-lg mb-4">Stay connected with us on social media for the latest updates, releases, and promotions.</p>
        <div className="flex space-x-6 mb-6">
          <FaTwitter size={32} />
          <FaFacebookF size={32} />
          <FaInstagram size={32} />
          <FaLinkedinIn size={32} />
        </div>
      </div>

      {/* Business Information Section */}
      <div className="flex-1">
        <h2 className="text-4xl font-bold mb-4">About Highest Waves</h2>
        <p className="text-lg mb-4">
          Highest Waves is your go-to platform for premium beats and high-quality music production. We offer a wide range of beats for artists, producers, and creators. 
        </p>
        <p className="text-lg mb-4">
          Our mission is to provide a seamless and secure experience for every customer. We prioritize the protection of your personal and payment information.
        </p>
        <p className="text-xs my-10">&copy; 2024 Highest Waves. All rights reserved.</p>
      </div>

      {/* Privacy and Security Section */}
      <div className="flex-1">
        <h2 className="text-4xl font-bold mb-4">Privacy & Data Security</h2>
        <p className="text-lg mb-4">
          We respect your privacy and are committed to protecting your data in accordance with the latest privacy regulations, including the GDPR.
        </p>
        <p className="text-lg mb-4">
          By using our platform, you agree to our <a href="#" className="underline text-cyan-400 hover:text-cyan-300">Terms of Service</a> and <a href="#" className="underline text-cyan-400 hover:text-cyan-300">Privacy Policy</a>.
        </p>
        <p className="text-xs my-10">
          Your personal data is encrypted and securely processed to ensure that your information remains safe.
        </p>
      </div>

      {/* Newsletter Signup Section */}
      <div className="flex-1 flex flex-col items-center md:items-start">
        <h2 className="text-4xl font-bold mb-6">Reach Us</h2>
        <p className="text-lg mb-6">
          Stay updated with our latest news, exclusive offers, and new beat releases by subscribing to our newsletter.
        </p>
        <form className="flex flex-col md:flex-row items-center gap-4 w-full">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full md:w-auto p-4 mb-4 md:mb-0 rounded-lg border-2 border-transparent focus:border-[#5A7491] bg-[#2d3748] text-white placeholder-gray-400"
          />
          <button 
            type="submit" 
            className="bg-gradient-to-r from-[#6D8BA6] to-[#5A7491] text-white py-3 px-6 rounded-lg shadow-lg hover:from-[#5A7491] hover:to-[#6D8BA6] transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Subscribe
          </button>
        </form>
      </div>

    </div>

    <div className="py-6 text-center text-sm mt-24">
      <p>Built with passion by Highest Waves. Your beats, your way.</p>
    </div>
  </div>
</footer>

  );
};

export default Footer;
