// components/Beats/AudioPlayer/AudioPlayer.js
import React from 'react';
import ReactPlayer from 'react-player';

const AudioPlayer = ({ url, playing, onPlayPause }) => {
  return (
    <div className="audio-player">
      <ReactPlayer 
        url={url} 
        playing={playing} 
        controls={true} 
        height="50px" 
        width="100%" 
      />
      <button onClick={onPlayPause}>
        {playing ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default AudioPlayer;