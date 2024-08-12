import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; 
import { isAdmin, isAuthenticated } from '../../services/auth';

const Header = () => {
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    const checkAdmin = async () => {
      const result = await isAdmin();
      
      setAdmin(result);
    };

    const checkUser = async () => {
      const result = await isAuthenticated();
      
      setUser(result);
    };

    checkUser();
    checkAdmin();
  }, []);

  return (
    <header className="bg-blue-950 flex justify-between items-center p-2" style={{ backgroundColor: '#071D26' }}>
      <nav className="flex row">
        <ul className="flex items-center space-x-4">
          <Link to='/'>
            <img src='/assets/highestwaves-logo.png' alt='Highest Waves Logo' className="mx-10" width='140px' />
          </Link>
          <li>
            <Link to="/beats" className="text-white text-lg hover:underline">Explore</Link>
          </li>
          <li>
            <Link to="/contact" className="text-white text-lg hover:underline">About</Link>
          </li>
          {admin && (
            <li>
              <Link to="/admin" className="text-white text-lg hover:underline">Admin</Link>
            </li>
          )}

          {user ? 
          <li>
            <h1 className='text-white'>Welcome, {user.username}</h1>
          </li> : ""}
          <li>
            <Link to="/login" className="text-white text-lg hover:underline">
              <FaUserCircle size={28} />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
