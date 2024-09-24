import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import { FaPlay, FaPause, FaForward, FaBackward, FaRedo, FaVolumeUp, FaVolumeMute, FaRandom } from 'react-icons/fa'; // Added FaRandom
import { setCurrentTrack, setCurrentTitle, setCurrentCover, setCurrentOwner, togglePlayPause, setIsRepeating, setVolume, setIsShuffling } from '../../store/audioPlayerSlice';
import { selectPlaylist, selectCurrentTrackIndex, setCurrentIndex } from '../../store/playlistSlice';
import './AudioPlayer.css'

// Add setIsShuffling and isShuffling to your audioPlayerSlice
const AudioPlayer = () => {
  const playerRef = useRef(null);
  const dispatch = useDispatch();
  const playlist = useSelector(selectPlaylist);
  const currentIndex = useSelector(selectCurrentTrackIndex);
  const { currentTrack, currentTitle, currentCover, currentOwner, isPlaying, isRepeating, volume, isShuffling } = useSelector(state => state.audioPlayer); // Added isShuffling to selector
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (currentTrack) {
      dispatch(togglePlayPause(true)); 
    } 
  }, [currentTrack]);

  useEffect(() => {
    const updateProgress = () => {
      if (playerRef.current && isPlaying ) {
        handleProgress({
          played: playerRef.current.getCurrentTime() / playerRef.current.getDuration()
        });
        requestAnimationFrame(updateProgress);
      }
    };

    if (isPlaying) {
      requestAnimationFrame(updateProgress);
    }
    return () => cancelAnimationFrame(updateProgress);
  }, [isPlaying]);

  useEffect(() => {
    if (playerRef.current && currentTrack) {
      playerRef.current.seekTo(0);
    }
  }, [currentTrack]);

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

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    if (isFinite(newVolume)) {
      dispatch(setVolume(newVolume));
    }
  };

  const handleMuteToggle = () => {
    const newVolume = volume === 0 ? 0.5 : 0;
    dispatch(setVolume(newVolume));
  };

  const handleRepeatToggle = () => {
    dispatch(setIsRepeating(!isRepeating));
  };

  const handleShuffleToggle = () => {
    dispatch(setIsShuffling(!isShuffling)); // Toggle shuffle mode
  };

  const handleNext = () => {
    let nextIndex;
    if (isShuffling) {
      nextIndex = Math.floor(Math.random() * playlist.length); // Pick a random track if shuffle is enabled
    } else {
      nextIndex = (currentIndex + 1) % playlist.length; // Normal sequential behavior
    }

    const nextTrackData = playlist[nextIndex];

    if (nextTrackData) {
      const nextTrackURL = `http://localhost:3001/${nextTrackData.audioURL}`;
      const nextCoverURL = `http://localhost:3001/${nextTrackData.image}`;
      dispatch(setCurrentTrack(nextTrackURL));
      dispatch(setCurrentCover(nextCoverURL));
      dispatch(setCurrentOwner(nextTrackData.owner.username));
      dispatch(setCurrentTitle(nextTrackData.title));
      dispatch(setCurrentIndex(nextIndex));
      dispatch(togglePlayPause(true)); // Start playing the next track
    }
  };

  const handlePrevious = () => {
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    const prevTrackData = playlist[prevIndex];
    if (prevTrackData) {
      const prevTrackURL = `http://localhost:3001/${prevTrackData.audioURL}`;
      const prevCoverURL = `http://localhost:3001/${prevTrackData.image}`;
      dispatch(setCurrentTrack(prevTrackURL));
      dispatch(setCurrentCover(prevCoverURL));
      dispatch(setCurrentOwner(prevTrackData.owner.username));
      dispatch(setCurrentTitle(prevTrackData.title));
      dispatch(setCurrentIndex(prevIndex));
      dispatch(togglePlayPause(true)); // Start playing the previous track
    }
  };

  const handleTrackEnd = () => {
    if(isRepeating){
      playerRef.current.seekTo(0);
    }else{
      handleNext();
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white px-10 py-3 flex flex-col z-50">
      <ReactPlayer 
        ref={playerRef}
        url={currentTrack} 
        playing={isPlaying} 
        controls={false} 
        height="0" 
        width="0"
        volume={volume} 
        onProgress={handleProgress}
        onDuration={handleDuration} 
        onEnded={handleTrackEnd} 
        onError={(error) => console.error('ReactPlayer error:', error)}
        onReady={() => console.log('ReactPlayer ready')}
      />

      {/* Progress Bar Section */}
      <div className="relative my-1 flex items-center justify-between w-full">

        <span className="text-xs text-gray-400">{formatTime(duration * (progress / 100))}</span>

        {/* Progress Bar */}
        <input 
          type="range" 
          min="0" 
          max="100" 
          step="0.1" 
          value={isFinite(progress) ? progress : 0} 
          onChange={handleSeek} 
          className="w-full mx-2 appearance-none h-2 bg-gray-700 rounded-full cursor-pointer"
          style={{
            background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${progress}%, #4b5563 ${progress}%, #4b5563 100%)`,
            transition: 'background 0.1s linear' // Smooth background transition
          }}
        />


        <span className="text-xs text-gray-400">{formatTime(duration)}</span>
      </div>

      <div className="flex items-center relative">
                
        {/* Image and Title Section */}
        <div className="flex items-center flex-shrink-0 mt-2">
          <img 
            key={currentCover} 
            src={currentCover} 
            alt="Cover Art" 
            className="w-14 h-14 rounded-md object-cover"
          />
        </div>

          {/* Centered Title and Owner Section */}
          <div className="ml-4 flex flex-col justify-center items-start">
            {/* Title centered relative to its container */}
            <h3 className="text-sm font-semibold text-center w-full">{currentTitle}</h3>
            {/* Owner aligned left, directly beneath the title */}
            <h3 className="text-xs text-gray-400 text-center">{currentOwner}</h3>
          </div>

        {/* Control Buttons Section */}
        <div className="flex-grow flex items-center justify-center absolute inset-x-0">
          <div className="flex space-x-4">

            <button 
              onClick={handleShuffleToggle} 
              className={`text-gray-400 hover:text-white ${isShuffling ? 'text-green-400' : 'text-gray-400'}`}
            >
              <FaRandom size={20} /> {/* Shuffle button */}
            </button>

            <button 
              onClick={handlePrevious}
              className="text-gray-400 hover:text-white"
            >
              <FaBackward size={20} />
            </button>

            <button 
              onClick={() => dispatch(togglePlayPause())} 
              className="text-cyan-400 hover:text-white"
            >
              {isPlaying ? <FaPause size={36} /> : <FaPlay size={36} />}
            </button>

            <button 
              onClick={handleNext}
              className="text-gray-400 hover:text-white"
            >
              <FaForward size={20} />
            </button>

            <button 
              onClick={handleRepeatToggle} 
              className={`text-gray-400 hover:text-white ${isRepeating ? 'text-green-400' : 'text-gray-400'}`}
            >
              <FaRedo size={20} />
            </button>

          </div>
        </div>

        {/* Volume and Mute Section */}
        <div className="absolute right-0 flex items-center space-x-2">

          <button 
            onClick={handleMuteToggle} 
            className="text-gray-400 hover:text-white"
          >
            {volume > 0 ? <FaVolumeUp size={24} /> : <FaVolumeMute size={24} />}
          </button>
          
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={isFinite(volume) ? volume : 0} 
            onChange={handleVolumeChange} 
            className="w-24 appearance-none h-2 bg-gray-700 rounded-full cursor-pointer"
            style={{
              background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${volume * 100}%, #4b5563 ${volume * 100}%, #4b5563 100%)`
            }}
          />

        </div>

        </div>
    </div>
  );
};

export default AudioPlayer;
