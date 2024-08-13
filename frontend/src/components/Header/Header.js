import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa'; 
import { isAdmin, isAuthenticated, logout } from '../../services/auth';
import PurchaseCart from '../PurchaseCart/PurchaseCart'; // Import the PurchaseCart component

const Header = () => {
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState("");
  const [showPurchaseCart, setShowPurchaseCart] = useState(false); // State to manage PurchaseCart visibility
  const navigate = useNavigate();

  const handleLogout = async () => {
    const getOut = await logout();

    if(!!getOut){
      navigate("/");
    }

    window.location.reload();
    return getOut;
  };
  
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
          <div>
          <li>
            <h1 className='text-white'>Welcome, {user.username}</h1>
          </li>
          <li>
              <button onClick={handleLogout} className="text-white hover:text-gray-200">Logout</button>
          </li>
          </div>
          : ""}
          
          <li>
            <Link to="/login" className="text-white text-lg hover:underline">
              <FaUserCircle size={28} />
            </Link>
          </li>
          <li>
            <button onClick={() => setShowPurchaseCart(true)} className="text-white text-lg hover:underline">
              <FaShoppingCart size={28} />
            </button>
          </li>
        </ul>
      </nav>
      {showPurchaseCart && <PurchaseCart onClose={() => setShowPurchaseCart(false)} />}
    </header>
  );
};

export default Header;
