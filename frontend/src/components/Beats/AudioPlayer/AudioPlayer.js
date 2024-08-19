import React from 'react';

const AudioPlayer = ({ audioURL }) => {
  return (
    <div className="audio-player">
      <audio controls>
        <source src={audioURL} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
