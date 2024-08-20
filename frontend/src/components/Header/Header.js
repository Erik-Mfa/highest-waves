import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa'; 
import { logout } from '../../services/auth';
import PurchaseCart from '../PurchaseCart/PurchaseCart';
import './Header.css'; 

const Header = ({ user, admin }) => {
  const [showPurchaseCart, setShowPurchaseCart] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const getOut = await logout();
    if (getOut) {
      navigate("/");
    }
  };

  return (
    <header className="bg-[#071D26] flex justify-between items-center p-6 px-20">
      <nav className="flex items-center justify-between w-full">
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
            <Link 
              to="/beats" 
            >
              Explore
            </Link>
          </li>
          <li className="text-white text-xl hover:scale-110 hover:bg-opacity-70 transition-transform duration-200">
            <Link 
              to="/contact" 
            >
              About
            </Link>
          </li>
          {admin && (
            <li className="text-white text-xl hover:scale-110 hover:bg-opacity-70 transition-transform duration-200">
              <Link 
                to="/admin" 
              >
                Admin
              </Link>
            </li>
          )}
        </ul>
        <ul className="flex items-center space-x-10">
          {user ? (
            <>
              <li>
                <p className="text-white text-xl hover:scale-110 hover:bg-opacity-70 transition-transform duration-200">{`Welcome, ${user.username}`}</p>
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
                className="text-white text-xl hover:scale-110 hover:bg-opacity-70 transition-transform duration-200"
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
              <div className="absolute right-0 mt-2 w-[32rem] max-h-[70vh] bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50 overflow-y-auto p-4">
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
