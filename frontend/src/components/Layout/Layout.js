import React, { useState, useEffect, useContext } from 'react';
import Header from '../Header/Header';
import { isAdmin, isAuthenticated } from '../../services/endpoints/auth';
import PurchaseCart from '../PurchaseCart/PurchaseCart';
import ContextAudioPlayer from './ContextAudioPlayer';
import AudioPlayer from '../Beats/AudioPlayer/AudioPlayer'; 

const Layout = ({ children }) => {
  const [showPurchaseCart, setShowPurchaseCart] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [user, setUser] = useState(null);

  const { currentTrack, isPlaying, togglePlayPause } = useContext(ContextAudioPlayer);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const isUserAdmin = await isAdmin();
        const authenticatedUser = await isAuthenticated();
        
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
      <Header 
        setShowPurchaseCart={setShowPurchaseCart} 
        user={user} 
        admin={admin}
      />

      <main>{children}</main>

      {showPurchaseCart && <PurchaseCart onClose={() => setShowPurchaseCart(false)} />}

      {currentTrack && (
        <AudioPlayer 
          url={currentTrack} 
          playing={isPlaying} 
          onPlayPause={togglePlayPause} 
        />
      )}
    </>
  );
};

export default Layout;
