import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa'; 
import { logout } from '../../services/auth';
import PurchaseCart from '../PurchaseCart/PurchaseCart';

const Header = ({user, admin}) => {
  const [showPurchaseCart, setShowPurchaseCart] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const getOut = await logout();

    if (getOut) {
      navigate("/");
    }

    window.location.reload();
  };

  return (
    <header className="bg-[#071D26] flex justify-between items-center p-6">
      <nav className="flex items-center">
        <ul className="flex items-center space-x-8">
          <li>
            <Link to='/'>
              <img src='/assets/highestwaves-logo.png' alt='Highest Waves Logo' className="w-36" />
            </Link>
          </li>
          <li>
            <Link to="/beats" className="text-white text-xl hover:underline">Explore</Link>
          </li>
          <li>
            <Link to="/contact" className="text-white text-xl hover:underline">About</Link>
          </li>
          {admin && (
            <li>
              <Link to="/admin" className="text-white text-xl hover:underline">Admin</Link>
            </li>
          )}
          {user ? (
            <div className="flex items-center space-x-6">
              <li>
                <span className='text-white text-xl'>{user && user.username ? `Welcome, ${user.username}` : ""}</span>
              </li>
              <li>
                <button onClick={handleLogout} className="text-white text-xl hover:text-gray-300">Logout</button>
              </li>
            </div>
          ) : (
            <li>
              <Link to="/login" className="text-white text-xl hover:underline">
                <FaUserCircle size={32} />
              </Link>
            </li>
          )}
          <li className="relative">
            <button 
              onClick={() => setShowPurchaseCart(prev => !prev)} 
              className="text-white text-xl hover:text-gray-300"
            >
              <FaShoppingCart size={32} />
            </button>

            {showPurchaseCart && (
              <div className="absolute right-0 mt-2 w-[32rem] max-h-[70vh] bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50 overflow-y-auto p-4">
                <PurchaseCart user={user}/>
              </div>
            )}
            
          </li>
        </ul>
      </nav>
    </header>
  );
  
};

export default Header;
