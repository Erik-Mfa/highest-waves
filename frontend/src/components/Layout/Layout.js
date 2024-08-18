import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import { isAdmin, isAuthenticated } from '../../services/auth';
import PurchaseCart from '../PurchaseCart/PurchaseCart';

const Layout = ({ children}) => {
  const [showPurchaseCart, setShowPurchaseCart] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    //SEND ADMIN TO HEADER
    const fetchData = async () => {
      try {
        const isUserAdmin = await isAdmin();
        const authenticatedUser = await isAuthenticated();
        
        console.log("Admin:", isUserAdmin);
        console.log("User:", authenticatedUser);
        
        setAdmin(isUserAdmin);
        setUser(authenticatedUser);
      } catch (error) {
        console.error("Error fetching data:", error);
        setAdmin(false);
        setUser(null);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header setShowPurchaseCart={setShowPurchaseCart} user={user} admin={admin} />

      {children}
      
      {showPurchaseCart && <PurchaseCart onClose={() => setShowPurchaseCart(false)} />}
    </>
  );
};

export default Layout;