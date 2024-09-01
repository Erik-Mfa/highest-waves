import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import { isAdmin, isAuthenticated } from '../../services/api/auth';
import PurchaseCart from '../PurchaseCart/PurchaseCart';
import AudioPlayer from './AudioPlayer/AudioPlayer';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentTrack, togglePlayPause, selectCurrentTrack, selectIsPlaying } from '../../store/audioPlayerSlice'; // Adjust paths as needed

const Layout = ({ children }) => {
  const [showPurchaseCart, setShowPurchaseCart] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const currentTrack = useSelector(selectCurrentTrack);
  const isPlaying = useSelector(selectIsPlaying);

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

  const handlePlayPause = () => {
    dispatch(togglePlayPause());
  };

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
          onPlayPause={handlePlayPause} 
        />
      )}
    </>
  );
};

export default Layout;
