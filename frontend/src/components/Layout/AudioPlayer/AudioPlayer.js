import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import { FaPlay, FaPause, FaForward, FaBackward, FaRedo, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { setCurrentTrack, setCurrentTitle, setCurrentCover, togglePlayPause, setIsRepeating, setVolume } from '../../../store/audioPlayerSlice';
import { selectPlaylist, selectCurrentTrackIndex, setCurrentIndex } from '../../../store/playlistSlice';

const AudioPlayer = () => {
  const playerRef = useRef(null);
  const dispatch = useDispatch();
  const playlist = useSelector(selectPlaylist);
  const currentIndex = useSelector(selectCurrentTrackIndex);
  
  const { currentTrack, currentTitle, currentCover, isPlaying, isRepeating, volume } = useSelector(state => state.audioPlayer);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  useEffect(() => {
    if (currentTrack) {
      dispatch(togglePlayPause(true)); // Ensure playing when the track is loaded
    }
  }, [currentTrack]);

  useEffect(() => {
    const updateProgress = () => {
      if (playerRef.current && isPlaying && !isSeeking) {
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
  }, [isPlaying, isSeeking]);

  useEffect(() => {
    if (playerRef.current && currentTrack) {
      playerRef.current.seekTo(0);
    }
  }, [currentTrack]);

  const handleProgress = (state) => {
    if (!isSeeking) {
      setProgress(state.played * 100);
    }
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

  const handleSeekStart = () => {
    setIsSeeking(true);
  };

  const handleSeekEnd = () => {
    setIsSeeking(false);
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

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % playlist.length;
    const nextTrackData = playlist[nextIndex];
    if (nextTrackData) {
      const nextTrackURL = `http://localhost:3001/${nextTrackData.audioURL}`;
      const nextCoverURL = `http://localhost:3001/${nextTrackData.image}`;
      dispatch(setCurrentTrack(nextTrackURL));
      dispatch(setCurrentCover(nextCoverURL));
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
      dispatch(setCurrentTitle(prevTrackData.title));
      dispatch(setCurrentIndex(prevIndex));
      dispatch(togglePlayPause(true)); // Start playing the previous track
    }
  };

  const handleTrackEnd = () => {
    if (isRepeating) {
      if (playerRef.current) {
        playerRef.current.seekTo(0);
        dispatch(togglePlayPause(true)); // Force the track to play again
      }
    } else {
      handleNext();
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4 flex flex-col z-50">
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
      
      <div className="flex items-center px-4 relative">
        <div className="flex items-center flex-shrink-0">
          <img 
            key={currentCover} 
            src={currentCover} 
            alt="Cover Art" 
            className="w-16 h-16 rounded-md object-cover"
          />
          <h3 className="text-sm font-semibold ml-4">{currentTitle}</h3>
        </div>

        <div className="flex-grow flex items-center justify-center absolute inset-x-0">
          <div className="flex space-x-4">
            <button 
              onClick={handlePrevious}
              className="text-gray-400 hover:text-white"
            >
              <FaBackward size={24} />
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

        <div className="absolute right-4 flex items-center space-x-2">
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
            className="w-24"
          />
        </div>
      </div>

      <div className="relative w-full mt-2">
        <input 
          type="range" 
          min="0" 
          max="100" 
          step="0.1" 
          value={isFinite(progress) ? progress : 0} 
          onMouseDown={handleSeekStart}
          onChange={handleSeek} 
          onMouseUp={handleSeekEnd}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{formatTime(duration * (progress / 100))}</span>
          <span>{formatTime(duration)}</span> {/* Display the total duration */}
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
