import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaChevronDown } from 'react-icons/fa';

const Hero = () => {
  const navigate = useNavigate();

  const handleNavigation = (path, sectionId) => {
    if (window.location.pathname === '/') {
      document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(path);
      setTimeout(() => {
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
      }, 100); 
    }
  };

  return (
    <section 
      className="relative flex items-center justify-end h-[95vh] bg-cover bg-center text-white " 
      style={{ backgroundImage: "url('/assets/rizzo-e-compania.jpeg')", backgroundPosition: "center top" }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative text-right mr-24">
        <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r text-teal-400" style={{ fontFamily: '"Gupter", serif' }}>
          Welcome to Highest Waves
        </h1>
        <p className="text-4xl mb-6 tracking-widest">Discover the best beats and sounds</p>
        <button className="mt-8 px-6 py-3 bg-teal-500 hover:bg-teal-900 text-xl font-semibold rounded-lg shadow-lg transition duration-300">
          Explore Music
        </button>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
      <ul>
      <li className="text-white text-xl hover:scale-110 hover:bg-opacity-70 transition-transform duration-200">
      <button onClick={() => handleNavigation('/', 'beats-section')}>

        <FaChevronDown size={24} />
        </button>
        </li>
        </ul>
      </div>

      <div className="absolute bottom-5 left-5 flex space-x-4">
        <a href="https://instagram.com" className="text-white hover:text-teal-500">
          <FaInstagram size={24} />
        </a>
        <a href="https://twitter.com" className="text-white hover:text-teal-500">
          <FaTwitter size={24} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
