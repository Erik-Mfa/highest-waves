// In AudioPlayerProvider.js
import React, { createContext, useState } from 'react';

const ContextAudioPlayer = createContext();

export const AudioPlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentCover, setCurrentCover] = useState('');

  const playTrack = (trackUrl, trackTitle, coverImage) => {
    console.log("Setting track URL Context:", trackUrl);
    setCurrentTitle(trackTitle);
    setCurrentCover(coverImage);
    setCurrentTrack(trackUrl);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  return (
    <ContextAudioPlayer.Provider value={{ currentTrack, currentTitle, currentCover, isPlaying, playTrack, togglePlayPause }}>
      {children}
    </ContextAudioPlayer.Provider>
  );
};

export default ContextAudioPlayer;
