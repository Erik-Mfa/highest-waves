import React, { useState, useRef, useContext, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { FaPlay, FaPause, FaForward, FaBackward, FaRedo, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import ContextAudioPlayer from '../ContextAudioPlayer';
import './AudioPlayer.css'

// Helper function to throttle progress updates
const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function (...args) {
    const context = this;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

const AudioPlayer = () => {
  const { currentTrack, currentTitle, currentCover, isPlaying, togglePlayPause } = useContext(ContextAudioPlayer);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isRepeating, setIsRepeating] = useState(false);
  const [volume, setVolume] = useState(0.5); // Default volume at 50%
  const playerRef = useRef(null);
  const [isSeeking, setIsSeeking] = useState(false);

  const handleProgress = throttle((state) => {
    if (!isSeeking) {
      setProgress(state.played * 100);
    }
  }, 100); // Throttle progress updates to every 100ms

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const handleSeek = (event) => {
    const newProgress = parseFloat(event.target.value);
    setProgress(newProgress);
    if (playerRef.current) {
      playerRef.current.seekTo(newProgress / 100);
    }
  };

  const handleSeekStart = () => {
    setIsSeeking(true);
  };

  const handleSeekEnd = () => {
    setIsSeeking(false);
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
  };

  const handleRepeatToggle = () => {
    setIsRepeating(prev => !prev);
  };

  useEffect(() => {
    const updateProgress = () => {
      if (playerRef.current && isPlaying && !isSeeking) {
        handleProgress({
          played: playerRef.current.getCurrentTime() / playerRef.current.getDuration()
        });
        requestAnimationFrame(updateProgress); // Continue updating
      }
    };

    requestAnimationFrame(updateProgress); // Start updating

    return () => cancelAnimationFrame(updateProgress);
  }, [isPlaying, isSeeking]);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4 flex flex-col z-50">
      <ReactPlayer 
        ref={playerRef}
        url={currentTrack} 
        playing={isPlaying} 
        controls={false} 
        height="0" 
        width="0"
        onProgress={handleProgress}
        onDuration={handleDuration}
        volume={volume}
        loop={isRepeating}
      />
      
      <div className="flex items-center px-4 relative">

{/* Image and Title Container */}
<div className="flex items-center flex-shrink-0">
  {/* Image */}
  <img 
    src={currentCover} 
    alt="Cover Art" 
    className="w-16 h-16 rounded-md object-cover"
  />

  {/* Title */}
  <h3 className="text-sm font-semibold ml-4">{currentTitle}</h3>
</div>

{/* Spacer to push playback controls to the center */}
<div className="flex-grow flex items-center justify-center absolute inset-x-0">
  <div className="flex space-x-4">
    <button 
      onClick={() => playerRef.current.seekTo(Math.max(progress / 100 - 10 / duration, 0))}
      className="text-gray-400 hover:text-white"
    >
      <FaBackward size={24} />
    </button>

    <button 
      onClick={togglePlayPause} 
      className="text-cyan-400 hover:text-white"
    >
      {isPlaying ? <FaPause size={36} /> : <FaPlay size={36} />}
    </button>

    <button 
      onClick={() => playerRef.current.seekTo(Math.min(progress / 100 + 10 / duration, 1))}
      className="text-gray-400 hover:text-white"
    >
      <FaForward size={24} />
    </button>

    <button 
      onClick={handleRepeatToggle} 
      className={`text-gray-400 hover:text-white ${isRepeating ? 'text-green-400' : 'text-gray-400'}`}
    >
      <FaRedo size={20} />
    </button>
  </div>
</div>

{/* Volume Control */}
<div className="absolute right-4 flex items-center space-x-2">
  <button 
    onClick={() => setVolume(prev => prev === 0 ? 0.5 : 0)} 
    className="text-gray-400 hover:text-white"
  >
    {volume > 0 ? <FaVolumeUp size={24} /> : <FaVolumeMute size={24} />}
  </button>
  <input 
    type="range" 
    min="0" 
    max="1" 
    step="0.01" 
    value={volume} 
    onChange={handleVolumeChange} 
    className="w-24 appearance-none h-2 bg-gray-700 rounded-full cursor-pointer"
    style={{
      background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${volume * 100}%, #4b5563 ${volume * 100}%, #4b5563 100%)`
    }}
  />
</div>
</div>

      
      {/* Slider */}
      <div className="relative w-full">
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={progress} 
          onChange={handleSeek} 
          onMouseDown={handleSeekStart}
          onMouseUp={handleSeekEnd}
          className="w-full appearance-none h-2 bg-gray-700 rounded-full cursor-pointer"
          style={{
            background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${progress}%, #4b5563 ${progress}%, #4b5563 100%)`,
            transition: 'background 0.1s linear' // Smooth background transition
          }}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
