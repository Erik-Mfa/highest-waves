import React, { useState } from 'react';
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send the form data to a backend)
    console.log('Form Data Submitted:', formData);
    // Reset form after submission
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="container mx-auto px-6 py-12 text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
      
      {/* Contact Info */}
      <div className="text-center mb-10">
        <p className="text-lg mb-4 text-slate-300">
          We'd love to hear from you! Whether you have a question about our beats, services, or anything else, our team is ready to answer your questions.
        </p>
        <p className="text-md text-slate-400">Email: support@highestwaves.com</p>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-md font-semibold text-slate-200">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 mt-2 bg-gray-700 rounded-md border-2 border-transparent focus:border-cyan-400 text-white"
            placeholder="Your name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-md font-semibold text-slate-200">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 mt-2 bg-gray-700 rounded-md border-2 border-transparent focus:border-cyan-400 text-white"
            placeholder="Your email"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block text-md font-semibold text-slate-200">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-3 mt-2 bg-gray-700 rounded-md border-2 border-transparent focus:border-cyan-400 text-white"
            placeholder="Your message"
            rows="5"
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-[#4C687D] to-[#3F5366] py-3 text-lg text-white rounded-md shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
        >
          Send Message
        </button>
      </form>

      {/* Social Media Links */}
      <div className="text-center mt-10">
        <h2 className="text-3xl font-bold mb-4 text-slate-200">Follow Us</h2>
        <div className="flex justify-center space-x-6">
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
      </div>
    </div>
  );
};

export default ContactPage;
