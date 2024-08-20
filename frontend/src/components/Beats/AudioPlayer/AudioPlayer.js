import React, { useState, useRef, useContext } from 'react';
import ReactPlayer from 'react-player';
import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa';
import AudioPlayerContext from '../../Layout/AudioPlayerContext';

const AudioPlayer = () => {
  const { currentTrack, currentTitle, currentCover, isPlaying, togglePlayPause } = useContext(AudioPlayerContext);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef(null);

  const handleProgress = (state) => {
    setProgress(state.played * 100);
  };

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

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white p-10 flex flex-col items-center space-y-2 z-50">
      <ReactPlayer 
        ref={playerRef}
        url={currentTrack} 
        playing={isPlaying} 
        controls={false} 
        height="0" 
        width="0"
        onProgress={handleProgress}
        onDuration={handleDuration}
      />
      <div className="flex flex-row items-center space-x-8">
        <img 
          src={currentCover} 
          alt="Cover Art" 
          className="w-24 h-24 rounded-md object-cover" 
        />
        <div className="text-center">
          <h3 className="text-lg font-semibold">{currentTitle}</h3>
        </div>
      </div>
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={progress} 
        onChange={handleSeek} 
        className="w-full mt-2 appearance-none h-2 bg-gray-700 rounded-full cursor-pointer"
        style={{
          background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${progress}%, #4b5563 ${progress}%, #4b5563 100%)`
        }}
      />
      <div className="flex items-center space-x-4">
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
        </div>
    </div>
  );
};

export default AudioPlayer;
