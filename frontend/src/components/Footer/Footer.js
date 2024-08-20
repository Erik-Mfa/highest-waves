import React from 'react';
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="text-white py-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16">

          {/* Contact Section */}
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
            <p className="text-lg">123 Music Lane, Sound City, ST 45678</p>
            <p className="text-lg">Email: <a href="mailto:info@highestwaves.com" className="hover:underline">info@highestwaves.com</a></p>
            <p className="text-lg">Phone: <a href="tel:+1234567890" className="hover:underline">+1 (234) 567-890</a></p>
            <p className="text-xs my-10">&copy; 2024 Highest Waves. All rights reserved.</p>
          </div>

          {/* Social Media Section */}
          <div className="flex-1 flex flex-col items-center md:items-start">
            <h2 className="text-4xl font-bold mb-6">Follow Us</h2>
            <div className="flex space-x-6 mb-6">
              <a href="#" className="text-[#1da1f2] hover:text-[#0d8bf2]" aria-label="Twitter">
                <FaTwitter size={32} />
              </a>
              <a href="#" className="text-[#4267B2] hover:text-[#365899]" aria-label="Facebook">
                <FaFacebookF size={32} />
              </a>
              <a href="#" className="text-[#E1306C] hover:text-[#c13584]" aria-label="Instagram">
                <FaInstagram size={32} />
              </a>
              <a href="#" className="text-[#0077b5] hover:text-[#005582]" aria-label="LinkedIn">
                <FaLinkedinIn size={32} />
              </a>
            </div>
          </div>

          {/* Newsletter Signup Section */}
          <div className="flex-1 flex flex-col items-center md:items-start">
            <h2 className="text-4xl font-bold mb-6">Reach us!</h2>
            <p className="text-lg mb-6">Stay updated with our latest news, promotions, and new beats by subscribing to our newsletter.</p>
            <form className="flex flex-col md:flex-row items-center gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="p-4 mb-4 md:mb-0 md:mr-4 rounded-lg border-2 border-transparent focus:border-[#5A7491] bg-[#2d3748] text-white placeholder-gray-400"
              />
              <button type="submit" className="bg-gradient-to-r from-[#6D8BA6] to-[#5A7491] text-white py-3 px-6 rounded-lg shadow-lg hover:from-[#5A7491] hover:to-[#6D8BA6] transform hover:scale-105 transition-all duration-300 ease-in-out">
                Subscribe
              </button>
            </form>
          </div>

        </div>
        <div className="py-6 text-center text-sm mt-24">
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
