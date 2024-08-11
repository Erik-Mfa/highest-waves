import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-950 flex justify-center p-2" style={{backgroundColor: '#071D26'}}>
    <nav className='flex row'>
        <ul className='content-center'>
          <li>
            <Link to="/beats" className="text-white text-lg hover:underline">Explore</Link>
          </li>
        </ul>
      
      <Link to='/'>
        <img src='/assets/highestwaves-logo.png' alt='Highest Waves Logo' className="mx-10" width='140px' />
      </Link>
      
        <ul className='content-center'>
          <li>
            <Link to="/contact" className="text-white text-lg hover:underline">About</Link>
          </li>
        </ul>
    </nav>
    </header>
  );
};

export default Header;
