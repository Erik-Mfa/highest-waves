import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa'; 
import { logout } from '../../services/api/auth';
import PurchaseCart from '../PurchaseCart/PurchaseCart'; // <-- Add this import
import './Header.css'; 

const Header = ({ user, admin }) => {
  const [showPurchaseCart, setShowPurchaseCart] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const success = await logout();
      if (success) {
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleNavigation = (path, sectionId) => {
    if (window.location.pathname === '/') {
      document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(path);
      setTimeout(() => {
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
      }, 100); // Delay to allow the navigation to complete
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 text-white z-50">
      <nav className="flex justify-between items-center p-2 px-20">
        <ul className="flex items-center space-x-8">
          <li>
            <Link to='/'>
              <img 
                src='/assets/highestwaves-logo.png' 
                alt='Highest Waves Logo' 
                className="w-36 hover:scale-105 transition-transform duration-200" 
              />
            </Link>
          </li>
          <li className="text-white text-xl hover:scale-110 hover:bg-opacity-70 transition-transform duration-200">
            <button onClick={() => handleNavigation('/', 'beats-section')}>
              Explore
            </button>
          </li>
          <li className="text-white text-xl hover:scale-110 hover:bg-opacity-70 transition-transform duration-200">
            <button onClick={() => handleNavigation('/', 'about-section')}>
              About
            </button>
          </li>
          {admin && (
            <li className="text-white text-xl hover:scale-110 hover:bg-opacity-70 transition-transform duration-200">
              <Link to="/admin">
                Admin
              </Link>
            </li>
          )}
        </ul>

        <ul className="flex items-center space-x-10">
          {user ? (
            <>
              <li>
                <p className="text-white text-xl hover:scale-110 hover:bg-opacity-70 transition-transform duration-200">
                  {`Welcome, ${user.username}`}
                </p>
              </li>
              <li>
                <button 
                  onClick={handleLogout} 
                  className="text-white text-xl hover:scale-110 hover:bg-opacity-70 transition-transform duration-200"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link 
                to="/login" 
                className="text-white text-xl flex items-center hover:scale-110 hover:bg-opacity-70 transition-transform duration-200"
              >
                <FaUserCircle size={32} />
              </Link>
            </li>
          )}

          <li className="relative">
            <button 
              onClick={() => setShowPurchaseCart(prev => !prev)} 
              className="text-white text-xl hover:scale-110 hover:bg-opacity-70 transition-transform duration-200"
            >
              <FaShoppingCart size={32} />
            </button>
            {showPurchaseCart && (
              <div className="absolute right-0 mt-2 w-[32rem] max-h-[70vh] bg-teal-950 rounded-lg shadow-lg z-50 overflow-y-auto p-4">
                <PurchaseCart user={user} />
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
