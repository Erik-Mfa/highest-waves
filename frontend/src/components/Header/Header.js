import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaShoppingCart, FaMusic } from 'react-icons/fa'; 
import { logout } from '../../services/api/auth';
import PurchaseCart from '../PurchaseCart/PurchaseCart'; 
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
      }, 100);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-gray-900 text-white z-50 border-b-2 border-teal-950" >
        <nav className="flex justify-between items-center p-2 px-10 ">
          <ul className="flex items-center space-x-4">

            <li>
              <Link to='/'>
                <img 
                  src='/assets/highestwaves-logo.png' 
                  alt='Highest Waves Logo' 
                  className="w-28 hover:scale-105 transition-transform duration-200" 
                />
              </Link>
            </li>

            <li className="text-white text-lg hover:scale-110 hover:bg-opacity-70 transition-transform duration-200 flex items-center">
              <button onClick={() => handleNavigation('/', 'beats-section')} style={{ fontFamily: '"REM"' }} className="flex items-center">
                <FaMusic className="mr-2" /> {/* Music icon */}
                Explore
              </button>
            </li>

            <li className="text-white text-lg hover:scale-110 hover:bg-opacity-70 transition-transform duration-200">
              <button onClick={() => handleNavigation('/', 'about-section')} style={{ fontFamily: '"REM"' }}>
                About
              </button>
            </li>

          </ul>
          <ul className="flex items-center">
            {user ? (
              <>
                <li className='mr-4'>
                  <h1 className="text-white text-lg hover:scale-110 hover:bg-opacity-70 transition-transform duration-200 pr-3 " style={{ fontFamily: '"Be Vietnam Pro"', marginTop: 2 }}>
                    {`Welcome, ${user.username}`}
                  </h1>
                </li>
                <li className=''>
                  <button 
                    onClick={handleLogout} 
                    className="text-white text-lg hover:scale-110 hover:bg-opacity-70 transition-transform duration-200 "
                    style={{ fontFamily: '"REM"' }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="bg-teal-800 text-white text-lg mr-4 px-4 py-1 rounded-lg hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-500/50 transition-all duration-300 transform hover:scale-110">
                  <Link 
                    to="/login" 
                    >
                    Login
                  </Link>
                </li>

                <li className="bg-teal-800 text-white text-lg px-4 py-1 rounded-lg hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-500/50 transition-all duration-300 transform hover:scale-110"
                >
                  <Link 
                    to="/register" 
                  >
                    Register
                  </Link>
                </li>
              </>
            )}

            <li className="relative flex items-center space-x-10 ml-10">
              <button 
                onClick={() => setShowPurchaseCart(prev => !prev)} 
                className="text-white text-lg hover:scale-110 hover:bg-opacity-70 transition-transform duration-200 flex items-center"
              >
                <FaShoppingCart size={28} className="align-middle" />
              </button>

              {admin && (
              <li className="bg-teal-800 text-white text-lg px-4 py-1 rounded-lg hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-500/50 transition-all duration-300 transform hover:scale-110" style={{ fontFamily: '"REM"' }}>
                <Link to="/admin">
                  Admin
                </Link>
              </li>

              )}
            </li>
          </ul>
        </nav>
      </header>

      <div className={`fixed right-0 top-0 h-full mt-14 w-[30%] bg-teal-950 rounded-l-lg shadow-lg z-40 overflow-y-auto p-4 transition-transform duration-500 ease-in-out transform ${showPurchaseCart ? 'translate-x-0' : 'translate-x-full'}`}>
        <PurchaseCart user={user} />
      </div>


    </>
  );
};

export default Header;
